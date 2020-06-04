let kontejner = document.getElementById("containerMain");
window.addEventListener("resize", provjera);
provjera();

function provjera() {
    let visina = window.innerHeight;

    kontejner.style.height = visina + "px";
    console.log(kontejner.height);


    var x = "Available Height: " + screen.availHeight;
    var y = "Height: " + screen.height;
    console.log(x);
    console.log(y);
}