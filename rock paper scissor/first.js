let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreP = document.querySelector("#p1");
const compScoreP = document.querySelector("#p2");

const generateComp = () => {
    const options = ["rock","paper","scissors"];
    const randomNo = Math.floor(Math.random() * 3);
    return options[randomNo];
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const playGame = (userChoice) => {
    const compChoice = generateComp();

    if(userChoice == compChoice){
        drawGame();
    }else{
        let userWin = true;
        if(userChoice == "rock"){
            userWin = compChoice === "paper"? false : true;
        }else if(userChoice == "paper"){
            userWin = compChoice === "scissors"? false : true;
        }else{
            userWin = compChoice === "rock"? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

const drawGame = () => {
    msg.innerText = "It's a Draw.";
    msg.style.backgroundColor = "black";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScoreP.innerText = userScore; 
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScoreP.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};
