// sw.js — plaintext service worker for the locked review build.
//
// NEVER packed into site.enc.json (see scripts/lock-site.mjs EXCLUDE) and
// NEVER patched per build: it holds no secrets, only decrypted bytes handed
// to it at runtime by /preview-gate over a MessageChannel.
//
// Flow: gate unlocks (or restores a session snapshot) -> posts
//   {type:'SERVE', gen, files:[{p, mime, data}]}
///  (data = base64, decoded here) -> worker replies {type:'READY'} on the
// message port -> gate waits for control, then location.replace(target).
// From then on every in-scope navigation is served from memory as a REAL
// page, so back/forward/refresh are plain browser behavior.
//
// Memory only: no Cache API, no precache. The store dies with the worker.
// If the worker is killed while the tab still has its session snapshot, the
// stripped 404 stub bounces the tab back to the gate (?p=<path>), which
// re-posts from the snapshot — self-healing, no new code.
//
// RELOCK CONTRACT (stale worker): the gate registers `/sw.js?v=<gen>` where
// gen is a fresh random hex per `npm run lock` (see enc-manifest.json). A new
// gen is a new script URL, so the browser installs a FRESH worker per lock
// run instead of serving the previous bundle from a live stale worker.
// skipWaiting + clients.claim below make the fresh worker take over fast.
// (Corollary: if this file is ever edited, the update carries an empty store
// and in-flight navigations fall through to the 404 stub — expected.)

var store = null; // {gen, map: Map(relPath -> {mime, bytes})}

function b64ToBytes(b64) {
  var bin = atob(b64);
  var out = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Top-level message handler (NOT inside install/activate) so SERVE is never
// missed while the worker is starting up.
self.addEventListener('message', function (event) {
  var msg = event.data;
  if (!msg || msg.type !== 'SERVE' || !msg.gen || !msg.files) return;
  var map = new Map();
  for (var i = 0; i < msg.files.length; i++) {
    var f = msg.files[i];
    if (!f || !f.p || !f.data) continue;
    try {
      map.set(f.p, { mime: f.mime || 'application/octet-stream', bytes: b64ToBytes(f.data) });
    } catch (e) {
      // Skip the bad entry; the rest of the bundle still serves.
    }
  }
  // Always replace: a re-post for the same gen re-sets the store (harmless),
  // a new gen swaps the previous lock out (relock contract).
  store = { gen: msg.gen, map: map };
  var port = (event.ports && event.ports[0]) || event.source;
  if (port) {
    try {
      port.postMessage({ type: 'READY' });
    } catch (e) {}
  }
});

// Map a same-origin pathname to a bundle path:
//   "/" -> "index.html"; otherwise strip ONE trailing slash (except root),
//   then exact match wins, else extensionless + ".html"
//   ("/o-nama" -> "o-nama.html").
// Returns null on miss — the request falls through to the network and the
// stripped 404 stub handles it (the worker never fabricates 404s).
function mapPath(pathname) {
  if (!store) return null;
  if (pathname === '/') return store.map.has('index.html') ? 'index.html' : null;
  var p = pathname;
  if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
  var rel = p.replace(/^\/+/, '');
  if (!rel) return store.map.has('index.html') ? 'index.html' : null;
  if (store.map.has(rel)) return rel;
  if (!/\.[a-z0-9]+$/i.test(rel)) {
    var cand = rel + '.html';
    if (store.map.has(cand)) return cand;
  }
  return null;
}

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url;
  try {
    url = new URL(event.request.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return; // fonts etc. pass through
  var key = mapPath(url.pathname); // query stripped by using pathname
  if (!key) return; // miss or empty store -> network (404 stub on stripped dist)
  var entry = store.map.get(key);
  var ctype = entry.mime === 'text/html' ? 'text/html; charset=utf-8' : entry.mime;
  event.respondWith(
    Promise.resolve(new Response(entry.bytes, { headers: { 'Content-Type': ctype } }))
  );
});
