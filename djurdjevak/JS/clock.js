let clockElement = document.getElementById("JS_clock");

function timeNow() {

    // set hours seconds and minutes to current time
    //"updateTime" adds a leading "0" to all number so they are 2 digit
    let date = new Date();
    let hour = date.getHours();
    let minute = updateTime(date.getMinutes());
    let second = updateTime(date.getSeconds());
    // Set AM PM
    let midday = AmPm(hour);
    // convert to 12 hour fromat from 24h
    //set it to UpdateTime format
    hour = updateTime(convertTo12h(hour));

    clockElement.innerHTML = hour + ":" + minute + ":" + second + " " + midday;
    var t = setTimeout(timeNow, 1000);

}

function updateTime(time) {

    if (time > 9) {
        return time;
    } else {
        return "0" + time;
    }
}

function convertTo12h(hour) {

    return (hour == 0) ? 12 : ((hour > 12) ? hour - 12 : hour);
}

function AmPm(hour) {
    return (hour < 12) ? "AM" : "PM"
}

timeNow();