import * as fs from 'fs';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

var vDepth = 0;
var hPos = 0;

v.forEach((u)=>{
    let v = u.split(" ");
    let nval = Number.parseInt(v[1]);
    if (nval === NaN) { 
        return;
    }
    let out = "?";
    switch(v[0]){
        case "forward":
            hPos += nval;
            out = ">";
            break;
        case "down":
            vDepth += nval;
            out = "v";
            break;
        case "up":
            vDepth -= nval;
            out = "^";
            break;
        default:

    }
    console.log("depth: ",vDepth, " - pos: ",hPos, " - last entry: ("+out+"): ",v[1]);
});

console.log("Final 'value' = ", vDepth*hPos);