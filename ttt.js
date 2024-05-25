const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];

    //ui pr bhi empty kro
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //win wale ka green colour htao
        box.classList.remove("win");
    })
    newGamebtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer==='X'){
        currPlayer="O";
    }
    else{
        currPlayer="X";
    }
    gameinfo.innerText=`Current Player - ${currPlayer}`;

}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //check if X is winner
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }
            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //now we know we have winner //mark them gree
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        //it means we have a winner
        gameinfo.innerText=`Winner Player - ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }

    //you will reach here when there is no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    //board is filled
    if(fillCount===9){
        gameinfo.innerText="Game Tied";
        newGamebtn.classList.add("active");
    }
}

function hancleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currPlayer;
        gameGrid[index]=currPlayer; //inner logic ke liye
        boxes[index].style.pointerEvents="none";
        //swap turn
        swapTurn();
        //check koi jeet to nhi gya
        //check game over
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{    //index se pta chlega konse box me click hua h
    box.addEventListener("click",()=>{
        hancleClick(index);
    })
});

newGamebtn.addEventListener("click",initGame);