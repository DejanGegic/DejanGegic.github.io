let kontejner = document.querySelectorAll(".containerChild");
window.addEventListener("resize", provjera);
provjera();

function provjera() {
    let visina = screen.availHeight;
    for (let i = 0; i < kontejner.length; i++) {
        kontejner[i].style.height = visina + "px";
        console.log(kontejner[i].scrollHeight);
    }

    var x = "Available Height: " + screen.availHeight;
    var y = "Height: " + screen.height;
    console.log(x);
    console.log(y);
}