let setTime; //vrijeme koje je ubaceno
let now; //vrijeme koje je sad
let arr; //array iz setTime




function setAlarm() {
    //postavi vrijeme
    setTime = document.getElementById("fieldTime").value;
    //arr[0] is hours
    //arr[1] is minutes
    arr = setTime.split(":");



    countdown();
}

function countdown() {
    //get time now
    now = new Date();
    //loop it until we hit the time
    let loop = true;
    // 
    if (now.getMinutes() == arr[1] && now.getHours() == arr[0]) {
        // pusti djurdjevdan
        var audio = new Audio("./audio/djurdjevdan.mp3");
        audio.currentTime = 6;
        audio.play();

        loop = false; //izadji iz loopa
        //proikazi djurdjevak
        let djur = document.getElementById("djurdjevak").style.opacity = "1";

    } else {
        console.log("ne jos")
    }
    if (loop) {

        var t = setTimeout(countdown, 1000);

    }

}