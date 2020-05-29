let setTime; //vrijeme koje je ubaceno
let now; //vrijeme koje je sad
let arr; //array iz setTime
let postavljen = false; //provjerava da li je alarm vec pokrenut
//ucitaj djurdjevdan.mp3
var audio = new Audio("./audio/djurdjevdan.mp3");
audio.currentTime = 6;
audio.load;


function setAlarm() {
    //postavi vrijeme
    setTime = document.getElementById("fieldTime").value;
    //arr[0] is hours
    //arr[1] is minutes
    arr = setTime.split(":");


    if (!postavljen) {
        countdown();
        notificationAlarm();
        postavljen = true;
    } else { alert("Your alarm is already set for: " + setTime) }
}

function notificationAlarm() {
    var alarmTime = document.getElementById('alarmTime');
    alarmTime.innerHTML = 'Alarm set for: ' + setTime;
}

function countdown() {
    //get time now
    now = new Date();
    //loop it until we hit the time
    var loop = true;
    // 
    if (now.getMinutes() == arr[1] && now.getHours() == arr[0]) {
        // pusti djurdjevdan

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