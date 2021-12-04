import * as fs from 'fs';
import { format } from 'util';

let inp = fs.readFileSync("input.txt").toString();
let v = inp.split("\n");

// first line is calls
let calls = v[0].split(",");

interface board {
    rows: Array<boardRow>;
    won: boolean;
}

interface boardRow {
    cells: Array<boardCell>;
}

interface boardCell {
    number: number;
    marked: boolean;
}

let currentBoard: board = {rows: [], won: false};
let allBoards: Array<board> = [];
var lcnt = 2;
while (lcnt < v.length){
    if (v[lcnt] == ""){
        // board done
        allBoards.push(currentBoard);
        currentBoard = {rows: [], won: false};
    } else {
        let l = v[lcnt];
        let lpos = 0;
        let row: boardRow = {cells: []};
        while (lpos < l.length){
            row.cells.push({number: Number.parseInt(l.substr(lpos,2)), marked: false});
            lpos = lpos + 3;
        }
        currentBoard.rows.push(row);
    }
    lcnt++;
}
if (currentBoard.rows.length > 0)
    allBoards.push(currentBoard);

console.log("Got ",allBoards.length," boards, and ",calls.length, " calls.");

function printBoardAndCalcRest(board: board){
    let retval = 0;
    board.rows.forEach((row)=>{let rowTxt = ""; row.cells.forEach((cell)=>{
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
        if (b.won) return;
        b.rows.forEach((row)=>{
            row.cells.forEach((cell,cidx)=> {
                if (cell.number === currentCall){
                    cell.marked = true;
                    // check cells
                    let allMarked = true;
                    row.cells.forEach((cell2)=>{
                        if (!cell2.marked)
                            allMarked = false;
                    });
                    if (allMarked){
                        console.log("board ",bidx," has a line - bingo!");
                        let p = printBoardAndCalcRest(b);
                        b.won = true;
                        console.log("answer is: ",p," * ", currentCall," = ",(p*currentCall));
                    }
                    allMarked = true;
                    // check rows
                    b.rows.forEach((row2)=>{
                        if(!row2.cells[cidx].marked)
                            allMarked = false;
                    });
                    if (allMarked){
                        b.won = true;
                        console.log("board ",bidx," has a row - bingo!");
                        let p = printBoardAndCalcRest(b);
                        console.log("answer is: ",p," * ", currentCall," = ",(p*currentCall));
                    }

                }
            });
        });
    });
}

