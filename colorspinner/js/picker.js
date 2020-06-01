let heksElement = document.getElementById("colorHash"); //get string that needs to carry hex value
let heksValue;
let pressMe = false;
//mjenjaj boju kad se klikne pozadina
document.querySelector("#pozadina").addEventListener("click", hexGenerate);

hexGenerate(); //pokreni ga odma

function hexGenerate() {
    removePressMe();
    heksValue = Math.floor(Math.random() * 16777215).toString(16); //get hex value
    if (heksValue.length < 6) { heksValue = heksValue + "0" } //makes sure it's long enough
    document.querySelector("#pozadina").style.backgroundColor = "#" + heksValue; //set body BG to random color
    heksElement.innerHTML = "#" + heksValue; //display it
    hexDisplay();

    console.log(document.getElementById("colorName").innerHTML);

}

function hexDisplay() {

    let result = ntc.name('#' + heksValue);

    let rgb_value = result[0]; // #6495ed         : RGB value of closest match
    let specific_name = result[1]; // Cornflower Blue : Color name of closest match
    let is_exact_match = result[2]; // false           : True if exact color match

    document.getElementById("colorName").innerHTML = specific_name;
    document.getElementById("closestHash").innerHTML = rgb_value;
    document.getElementById("cube").style.backgroundColor = rgb_value;



    console.log(rgb_value);
    console.log(specific_name);
    console.log(is_exact_match);

}

function removePressMe() {
    if (!pressMe) {
        pressMe = true;
    } else {
        document.getElementById("pozadina").innerHTML = "";
    }
}