let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector(".new-btn");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener(("click"),() => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            drawGame();
        }
    });
});

const drawGame = () => {
    msg.innerText = "Game was a draw";
    msgContainer.classList.remove("hide");
    disableBox();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
         let pos1Val = boxes[pattern[0]].innerText;
         let pos2Val = boxes[pattern[1]].innerText;
         let pos3Val = boxes[pattern[2]].innerText;

         if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
            }
         }
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
};

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
};

const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click", resetGame);

 

 





 