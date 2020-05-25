// limit input to 2 numbers and 60 min and sec
function limit(element) {
    var max_chars = 2;

    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
    if (element.value > 60) {
        element.value = 59;
    }
}
// same but for hours, 24
function limitH(element) {
    var max_chars = 2;

    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
    if (element.value > 24) {
        element.value = 23;
    }
}