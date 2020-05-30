let heksElement = document.getElementById("colorHash"); //get string that needs to carry hex value
let heksValue;

function hexGenerate() {
    heksValue = Math.floor(Math.random() * 16777215).toString(16); //get hex value
    document.querySelector("body").style.backgroundColor = "#" + heksValue; //set body BG to random color
    hexDisplay();

}

function hexDisplay() {
    heksElement.innerHTML = "#" + heksValue;


}