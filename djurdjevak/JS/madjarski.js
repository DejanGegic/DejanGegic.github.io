let djur = document.getElementById("djurdjevak").style.display = "inline";
//ucitaj  mp3
var audioMadjarski = new audioMadjarski('./audioMadjarski/madjarski.mp3');
audioMadjarski.load();

function madjarski() {
    let djur = document.getElementById("djurdjevak").style.opacity = "1";
    audioMadjarski.play();
    var t = setTimeout(ugasiSliku, 3500);

}

function ugasiSliku() {
    djur = document.getElementById("djurdjevak").style.opacity = "0";
}