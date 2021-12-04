import * as fs from 'fs';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

var vDepth = 0;
var hPos = 0;

interface bitArrType {
    zeros: number;
    ones: number;
}

let bitArr: Array<bitArrType> = [];

v.forEach((u)=>{
    for(let i = 0; i < u.length; i++){
        if (bitArr.length <= i)
            bitArr.push({ zeros: 0, ones: 0});
        if (u[i] === "0")
            bitArr[i].zeros++;
        else
            bitArr[i].ones++;
    }
    console.log("parsed: ",u);
});

var gamma = "";
var episilon = "";

bitArr.forEach((v)=>{
    if (v.zeros > v.ones){
        gamma += "0";
        episilon += "1";
    } else {
        gamma += "1";
        episilon += "0";
    }
});

var gammaDec = Number.parseInt(gamma,2);
var epsilonDec = Number.parseInt(episilon, 2);
console.log("Gamma is (b)",gamma,"/(d)",gammaDec," and Epsilon is (b)",episilon, "/(d)",epsilonDec);
console.log("Result is: ",gammaDec * epsilonDec);

