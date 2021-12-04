import * as fs from 'fs';
import { format } from 'util';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

// first line is calls
let calls = v[0].split(",");

interface boardCell {
    number: number;
    marked: boolean;
}

let currentBoard: Array<Array<boardCell>> = [];
let allBoards: Array<Array<Array<boardCell>>> = [];
var lcnt = 2;
while (lcnt < v.length){
    if (v[lcnt] == ""){
        // board done
        allBoards.push(currentBoard);
        currentBoard = [];
    } else {
        let l = v[lcnt];
        let lpos = 0;
        let row: boardCell[] = [];
        while (lpos < l.length){
            row.push({number: Number.parseInt(l.substr(lpos,2)), marked: false});
            lpos = lpos + 3;
        }
        currentBoard.push(row);
    }
    lcnt++;
}
if (currentBoard.length > 0)
    allBoards.push(currentBoard);

console.log("Got ",allBoards.length," boards, and ",calls.length, " calls.");

function printBoardAndCalcRest(board: Array<Array<boardCell>>){
    let retval = 0;
    board.forEach((row)=>{let rowTxt = ""; row.forEach((cell)=>{
        if (cell.number < 10)
            rowTxt = rowTxt + " ";
        if (cell.marked)    
            rowTxt = rowTxt + " " + format('\x1b[37m%s\x1b[0m',cell.number);
        else {
            rowTxt = rowTxt + " " + format('\x1b[33m%s\x1b[0m',cell.number);
            retval = retval + cell.number;
        }
    }); console.log(rowTxt);});
    return retval;
}

console.log("let the bingo commence.");
let wehaveawinner = false;
let winnerboard;
while (!wehaveawinner && calls.length > 0){
    let currentCall = Number.parseInt(calls.splice(0,1)[0]);
    console.log(currentCall,"!");
    allBoards.forEach((b, bidx)=>{
        b.forEach((row)=>{
            row.forEach((cell,cidx)=> {
                if (cell.number === currentCall){
                    cell.marked = true;
                    console.log("board ",bidx, " got!");
                    // check cells
                    let allMarked = true;
                    row.forEach((cell2)=>{
                        if (!cell2.marked)
                            allMarked = false;
                    });
                    if (allMarked){
                        console.log("board ",bidx," has a line - bingo!");
                        let p = printBoardAndCalcRest(b);
                        console.log("answer is: ",p," * ", currentCall," = ",(p*currentCall));
                        wehaveawinner = true; 
                        return;
                    }
                    allMarked = true;
                    // check rows
                    b.forEach((row2)=>{
                        if(!row2[cidx].marked)
                            allMarked = false;
                    });
                    if (allMarked){
                        console.log("board ",bidx," has a row - bingo!");
                        let p = printBoardAndCalcRest(b);
                        console.log("answer is: ",p," * ", currentCall," = ",(p*currentCall));
                        wehaveawinner = true; 
                        return;
                    }

                }
            });
        });
    });
}

