let s = document.documentElement.clientWidth;
window.addEventListener("resize", dugmici);
let desk = document.querySelectorAll(".desktop");
let mob = document.querySelectorAll(".mobile");


dugmici();

function dugmici() {

    if (screen.width > 1025) {
        for (let i = 0; i < 2; i++) {
            desk[i].style.display = "flex";
            mob[i].style.display = "none";
            console.log("desk");
        }
    } else {
        for (let i = 0; i < 2; i++) {
            mob[i].style.display = "flex";
            desk[i].style.display = "none";
            console.log("mob");
        }
    }
}