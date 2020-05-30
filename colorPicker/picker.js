let heksElement = document.getElementById("colorHash"); //get string that needs to carry hex value
let heksValue;

let zvuk = new Audio("../djurdjevak/audio/djurdjevdan.mp3");

function hexGenerate() {
    heksValue = Math.floor(Math.random() * 16777215).toString(16); //get hex value
    document.querySelector("body").style.backgroundColor = "#" + heksValue; //set body BG to random color
    hexDisplay();

    zvuk.play();
}

function hexDisplay() {
    heksElement.innerHTML = "#" + heksValue;


}