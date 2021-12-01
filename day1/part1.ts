import * as fs from 'fs';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

var prev = -1;
var pos = 0;
var neg = 0;
var eq = 0;

v.forEach((u)=>{
    let nval = Number.parseInt(u);
    if (nval === NaN) { 
        return;
    }
    var out = "";
    if (prev == -1){
        prev = nval;
        out = "\u{1F7E6}"; 
        return;
    }
    if (nval > prev){
        pos++;
        out = "\u{2B06}";
    } else if (nval < prev){
        neg++;
        out = "\u{2B07}";
    } else {
        eq++;
        out = "=";
    }

    console.log("\u{2B50} new: ",nval, " - prev: ", prev, " - direction: ",out);
    prev = nval;
});

console.log("There have been: " + pos + " +, " + neg + " - and " + eq + " =.");
