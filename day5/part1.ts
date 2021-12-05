import * as fs from 'fs';
import { format } from 'util';

interface dict { [index: number]: dictN };
interface dictN { [index: number]: number };
let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");
let map: dict = {};

v.forEach((l)=>{
    if (l === undefined || l === "") return;
    let coords=l.split(" -> ");
    let cs1 = coords[0].split(",");
    let cs2 = coords[1].split(",");
    let c1 = [Number.parseInt(cs1[0]),Number.parseInt(cs1[1])];
    let c2 = [Number.parseInt(cs2[0]),Number.parseInt(cs2[1])];

    if (c1[0] == c2[0] || c1[1] == c2[1]) {

        if (c1[0] > c2[0]){
            let a = c2[0]
            c2[0] = c1[0];
            c1[0] = a;
        }
        if (c1[1] > c2[1]){
            let a = c2[1]
            c2[1] = c1[1];
            c1[1] = a;
        }

        console.log("processing x:",c1[0],"/y:",c1[1],"->x:",c2[0],"/y:",c2[1]);
        for(let i = c1[0]; i <= c2[0]; i++){
            for (let j = c1[1]; j <= c2[1]; j++) {
                if (!(i in map))
                    map[i] = {};    
                if (!(j in map[i]))
                    map[i][j] = 0;

                map[i][j]++;
            }
        }
    } else {
        console.log("rejecting diagonal line '",l,"'.");
    }
});

let count = 0;
Object.keys(map).forEach((kI)=>{
    let k = Number.parseInt(kI);
    Object.keys(map[k]).forEach((k2I)=>{
        let k2 = Number.parseInt(k2I);
        if (map[k][k2] > 1){
            count++;
            console.log("More than 1 entries for x:",k,"/y:",k2);
        } else {
            //console.log("<= 0: ",k,"/",k2);
        }
    });
});

console.log("total entires over 1: ",count);