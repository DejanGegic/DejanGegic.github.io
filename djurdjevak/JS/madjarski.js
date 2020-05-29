let djur = document.getElementById("djurdjevak").style.display = "inline";

function madjarski() {
    var audio = new Audio('./audio/madjarski.mp3');
    audio.play();
    let djur = document.getElementById("djurdjevak").style.opacity = "1";
    var t = setTimeout(ugasiSliku, 3500);

}

function ugasiSliku() {
    djur = document.getElementById("djurdjevak").style.opacity = "0";
}