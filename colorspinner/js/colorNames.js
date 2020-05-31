let main = new Vue({
    el: "#main",
    data: {
        hes: "#6195ed"
    }
})



let result = ntc.name('#6195ed');

let rgb_value = result[0]; // #6495ed         : RGB value of closest match
let specific_name = result[1]; // Cornflower Blue : Color name of closest match
let is_exact_match = result[2]; // false           : True if exact color match

console.log(rgb_value);
console.log(specific_name);
console.log(is_exact_match);