import * as fs from 'fs';
import { parse } from 'path/posix';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

var vDepth = 0;
var hPos = 0;

interface bitArrType {
    zeros: number;
    ones: number;
}

function parseNumbers(parseForOxygen: boolean = true){
    var oxygenNumbers = v;
    var oxyi = 0;
    while (oxygenNumbers.length > 1) {
        //console.log("> there are: ", oxygenNumbers.length, " numbers left.")
        
        let bitArr: Array<bitArrType> = [];
        bitArr = [];
        oxygenNumbers.forEach((u) => {
            for (let i = 0; i < u.length; i++) {
                if (bitArr.length <= i)
                    bitArr.push({ zeros: 0, ones: 0 });
                if (u[i] === "0")
                    bitArr[i].zeros++;
                else
                    bitArr[i].ones++;
            }
        });
    
        let newOxy = [];
        let i = oxyi;
        /*
        if (bitArr[i].zeros > bitArr[i].ones) 
            console.log("looking for '0' in position #",(i+1));
        else 
            console.log("looking for '1' in position #",(i+1));
        if (oxygenNumbers.length < 20){
            console.log("outputting remaining numbers: ");
            oxygenNumbers.forEach((a)=>console.log(a));
            bitArr.forEach((b,c)=>console.log("#",c, ":zeros: ",b.zeros," ones: ",b.ones));
        }*/
    
        for (let j = 0; j < oxygenNumbers.length; j++) {
            if ((bitArr[i].zeros > bitArr[i].ones) && 
                ((oxygenNumbers[j][i] == "0" && parseForOxygen) || (oxygenNumbers[j][i] == "1" && !parseForOxygen))) {
                if (bitArr[i].zeros != bitArr[i].ones)
                    newOxy.push(oxygenNumbers[j]);
            } else if ((bitArr[i].zeros < bitArr[i].ones) && 
                ((oxygenNumbers[j][i] == "1" && parseForOxygen) || (oxygenNumbers[j][i] == "0" && !parseForOxygen))) {
                newOxy.push(oxygenNumbers[j]);
            } else if ((bitArr[i].zeros === bitArr[i].ones)){
                if ((parseForOxygen && oxygenNumbers[j][i] === "1") || (!parseForOxygen && oxygenNumbers[j][i] === "0"))
                    newOxy.push(oxygenNumbers[j]);
            }
        }
        //console.log("- reduced to: ", newOxy.length, " numbers left.");
        oxygenNumbers = newOxy;
        oxyi++;
    }
    console.log("oxygenNumbers: ", oxygenNumbers);
    return oxygenNumbers[0];
}

var oxy = parseNumbers(true);

var o2 = parseNumbers(false);
console.log("there should be 1 number left, let's try:");
console.log(oxy);
console.log("there should be 1 number left, let's try:");
console.log(o2);
console.log("multiplied: ", (Number.parseInt(oxy,2) * Number.parseInt(o2,2)));