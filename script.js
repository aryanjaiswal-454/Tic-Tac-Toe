let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let turnO = true;  //  player O

const winPatterns=[
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6]  // Diagonal /
]

const resetGame=()=>{                               // Reset game to initial state
    turnO=true;
    enableBoxes();
    restoreColors();
    msgContainer.classList.add("hide");
}


boxes.forEach((box)=>{                               // Adding event listener to each box
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    })
})
const disableBoxes=()=>{                              // Disable all boxes
    boxes.forEach((box)=>{
        box.disabled=true;
    })
}
const enableBoxes=()=>{                               // Restore all boxes back to normal
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
    })
}
const restoreColors = () => {                         // Restore all boxes to white color
    boxes.forEach((box) => {
        box.style.backgroundColor = "rgb(255, 255, 255)";
    });
};

const checkWinner=()=>{                              // Check for winner
    for(pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if( pos1Val != "" || pos2Val != "" || pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                boxes[pattern[0]].style.backgroundColor="rgb(0, 255, 64)";
                boxes[pattern[1]].style.backgroundColor="rgb(0, 255, 64)";
                boxes[pattern[2]].style.backgroundColor="rgb(0, 255, 64)";
                showWinner(pos1Val);

                return;
            }
        }  
    }
}


const showWinner = (winner) => {                      // Show winner message
    disableBoxes();
    msg.innerText= `Congratulations!! Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
}

newGameBtn.addEventListener("click",resetGame);       // New Game 
resetBtn.addEventListener("click",resetGame);         // Reset Game