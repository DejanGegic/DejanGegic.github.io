let djur = document.getElementById("djurdjevak").style.display = "inline";
//ucitaj  mp3
var audio = new Audio('./audio/madjarski.mp3');
audio.load();

function madjarski() {
    let djur = document.getElementById("djurdjevak").style.opacity = "1";
    audio.play();
    var t = setTimeout(ugasiSliku, 3500);

}

function ugasiSliku() {
    djur = document.getElementById("djurdjevak").style.opacity = "0";
}