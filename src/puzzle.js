
class Puzzle {
    constructor(width , height) {
        this.width = width;
        this.height = height;
        this.puzzle = [];
        this.lastElement = (this.height * this.width) - 1;

        //generate puzzle
        this.makePuzzle(this.width  , this.height);
    }



    makePuzzle(width , height) {
       let indexValue = 0;
        for(let i = 0; i<width; i++) {
            this.puzzle[i] = [];
            for(let j = 0; j<height; j++) {
                //create a temporary value for last element
                indexValue = (indexValue == (this.lastElement)) ? 'T' : indexValue;
                this.puzzle[i].push(indexValue);
                indexValue++
            }
        }
        return this.shuffle(this.puzzle);
        // return this.puzzle;
    }

    shuffle(puzzle) {
        for (let i = puzzle.length-1; i >=0; i--) {
            
           let randomIndex = Math.floor(Math.random()*(i+1)); 
           let itemAtIndex = puzzle[randomIndex]; 
           
           puzzle[randomIndex] = puzzle[i]; 
           puzzle[i] = itemAtIndex;
        }
        return puzzle;
    }

}

let puzzleCreator = new Puzzle(4,4);
let tempIndexes;

const generateButtons = () => {
    //generate button depending on arrays    
    for(let i = 0; i<puzzleCreator.width; i++) {
        for(let j = 0; j<puzzleCreator.height; j++) {
                let btn = document.createElement('button');
                btnText = document.createTextNode(`${puzzleCreator.puzzle[i][j]}`);
                btn.setAttribute('parentIndex',i);
                btn.setAttribute('childIndex',j);
                btn.appendChild(btnText);
                if (puzzleCreator.puzzle[i][j] === 'T') {
                    tempIndexes = [i,j];
                }
                document.body.appendChild(btn);

                if ((j+1) % puzzleCreator.width == 0) {
                    let newLine = document.createElement('br');
                    document.body.appendChild(newLine);
                }
        }   

    }
};

document.addEventListener('DOMContentLoaded' , () => {
    generateButtons();
});

 document.addEventListener('click' , (event) => {
    if (event.target.nodeName === 'BUTTON') {
        let parentIndex = parseInt(event.target.getAttribute('parentIndex'));
        let childIndex  = parseInt(event.target.getAttribute('childIndex'));
        getNeighborPositions(parentIndex,childIndex);
    }
 });




const getNeighborPositions = (parentIndex,childIndex) => {
    let top    = null;
    let bottom = null;
    let left   = null;
    let right  = null;


     if (getLowIndexInColumn() === childIndex && getLowIndexinRow() === parentIndex) {
        //get bottom and right
        bottom = puzzleCreator.puzzle[parentIndex + 1][childIndex];
        right  = puzzleCreator.puzzle[parentIndex][childIndex + 1];
    } else if (getLastIndexInColumn() === childIndex && getLastIndexInRow() === parentIndex) {
        //get left and top
        left   = puzzleCreator.puzzle[parentIndex][childIndex - 1];
        top    = puzzleCreator.puzzle[parentIndex - 1][childIndex];
    } else if (getLastIndexInColumn() === childIndex && getLowIndexinRow() === parentIndex) { 
        //get left and bottom
        left   = puzzleCreator.puzzle[parentIndex][childIndex - 1];
        bottom = puzzleCreator.puzzle[parentIndex + 1][childIndex];
    } else if (getLowIndexInColumn() === childIndex && getLastIndexInColumn() === parentIndex) {
        //get top and right
        top    = puzzleCreator.puzzle[parentIndex - 1][childIndex];
        right  = puzzleCreator.puzzle[parentIndex][childIndex + 1];
    } else if (getLowIndexinRow() === parentIndex) {
        //get bottom , left and right
        left   = puzzleCreator.puzzle[parentIndex][childIndex - 1];
        right  = puzzleCreator.puzzle[parentIndex][childIndex + 1];
        bottom = puzzleCreator.puzzle[parentIndex + 1][childIndex];
    } else if (getLastIndexInRow() === parentIndex) {
        //get top , right and also left
        left   = puzzleCreator.puzzle[parentIndex][childIndex - 1];
        right  = puzzleCreator.puzzle[parentIndex][childIndex + 1];
        top    = puzzleCreator.puzzle[parentIndex - 1][childIndex];
    } else if (getLastIndexInColumn() === childIndex) {
        //get top , bottom and left
        left   = puzzleCreator.puzzle[parentIndex][childIndex - 1];
        top    = puzzleCreator.puzzle[parentIndex - 1][childIndex];
        bottom = puzzleCreator.puzzle[parentIndex + 1][childIndex];
    } else if (getLowIndexInColumn() === childIndex) {
        //get top , right and bottom
        top    = puzzleCreator.puzzle[parentIndex - 1][childIndex];
        right  = puzzleCreator.puzzle[parentIndex][childIndex + 1];
        bottom = puzzleCreator.puzzle[parentIndex + 1][childIndex];
    } else {
        left   = puzzleCreator.puzzle[parentIndex][childIndex - 1];
        right  = puzzleCreator.puzzle[parentIndex][childIndex + 1];
        top    = puzzleCreator.puzzle[parentIndex - 1][childIndex];
        bottom = puzzleCreator.puzzle[parentIndex + 1][childIndex];
    }
    //otherwise perform a round get position
    findTheTempValue(parentIndex , childIndex , {
        bottom,
        right,
        left,
        top
    });
};

const hasValue = (parentIndex,childIndex) => puzzleCreator.puzzle[parentIndex][childIndex] !== 'temp';
const getLastIndexInRow    = () => puzzleCreator.puzzle.length - 1;
const getLowIndexinRow     = () => puzzleCreator.puzzle.length - puzzleCreator.puzzle.length;
const getLastIndexInColumn = () => puzzleCreator.puzzle[getLowIndexinRow()].length - 1;
const getLowIndexInColumn  = () => puzzleCreator.puzzle[getLowIndexinRow()].length - puzzleCreator.puzzle[getLowIndexinRow()].length;


const move = (parentIndex , childIndex , toPosition) => {
    let temp = 0;
    switch(toPosition) {
        case 'bottom' : 
        // Bottom parentIndex + 1
         temp = puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]];
        puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]] = puzzleCreator.puzzle[parentIndex][childIndex];
        puzzleCreator.puzzle[parentIndex][childIndex] = temp; 
            break;

        case 'right' : 
        // Right child index + 1
          temp = puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]];
        puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]] = puzzleCreator.puzzle[parentIndex][childIndex];
        puzzleCreator.puzzle[parentIndex][childIndex] = temp; 
            break;

        case 'top' : 
        // Top parentIndex - 1
         temp = puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]];
        puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]] = puzzleCreator.puzzle[parentIndex][childIndex];
        puzzleCreator.puzzle[parentIndex][childIndex] = temp; 
            break;

        case 'left' : 
        // Left child index - 1
          temp = puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]];
        puzzleCreator.puzzle[tempIndexes[0]][tempIndexes[1]] = puzzleCreator.puzzle[parentIndex][childIndex];
        puzzleCreator.puzzle[parentIndex][childIndex] = temp; 
            break;
    }
    document.body.innerHTML = '';
    generateButtons();
};


const findTheTempValue = ( parentIndex , childIndex , moveObject) => {
   const keys  = Object.keys(moveObject);
   const values = Object.values(moveObject);
   values.forEach((value,key) => {
        if (value === 'T') {
            move(parentIndex,childIndex,keys[key]);
        }
   });
};


