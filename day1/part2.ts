import * as fs from 'fs';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

var prev = -1;
var pos = 0;
var neg = 0;
var eq = 0;

v.forEach((u, i, a)=>{
    if (i+1 > a.length) return;
    let nval1 = Number.parseInt(a[i]);
    let nval2 = Number.parseInt(a[i+1]);
    let nval3 = Number.parseInt(a[i+2]);
    if (nval1 === NaN || nval2 === NaN || nval3 === NaN) { 
        return;
    }
    let nSum = nval1 + nval2 + nval3;
    var out = "";
    if (prev == -1){
        prev = nSum;
        out = "\u{1F7E6}"; 
        return;
    }
    if (nSum > prev){
        pos++;
        out = "\u{2B06}";
    } else if (nSum < prev){
        neg++;
        out = "\u{2B07}";
    } else {
        eq++;
        out = "=";
    }

    console.log("\u{2B50} new: ",nSum, " - prev: ", prev, " - direction: ",out);
    prev = nSum;
});

console.log("There have been: " + pos + " +, " + neg + " - and " + eq + " =.");
