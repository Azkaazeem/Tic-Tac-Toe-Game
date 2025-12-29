const boxes = document.querySelectorAll('.box');
const msgContainer = document.getElementById('msg-container');
const resetBtn = document.getElementById('reset-btn');

let turn = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] 
];

function handleBoxClick(e) {
    const clickedBox = e.target;
    const boxIndex = clickedBox.getAttribute('data-index');

    if (boardState[boxIndex] !== "" || !gameActive) {
        return;
    }

    updateBoard(clickedBox, boxIndex);
  
    checkResult();
}

function updateBoard(box, index) {
    boardState[index] = turn;
    box.innerText = turn;
    box.classList.add(turn === "X" ? "x-mark" : "o-mark");
}

function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        let val1 = boardState[a];
        let val2 = boardState[b];
        let val3 = boardState[c];

        if (val1 === "" || val2 === "" || val3 === "") {
            continue;
        }
        if (val1 === val2 && val2 === val3) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        gameOver(turn + " Wins! 🎉");
        highlightWinners(winningCombination);
        return;
    }

    if (!boardState.includes("")) {
        gameOver("Game Draw! 🤝");
        msgContainer.style.color = "white";
        return;
    }

    turn = turn === "X" ? "O" : "X";
    msgContainer.innerText = `Player ${turn}'s Turn`;
}

function gameOver(message) {
    msgContainer.innerText = message;
    msgContainer.style.fontSize = "2rem";
    gameActive = false;
}

function highlightWinners(combination) {
    combination.forEach(index => {
        boxes[index].classList.add('win-box');
    });
}


// --- Reset Game ---
function resetGame() {
    turn = "X";
    gameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];
    msgContainer.innerText = "Player X's Turn";
    msgContainer.style.fontSize = "1.5rem";
    msgContainer.style.color = "#ffd700";
    
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove('x-mark', 'o-mark', 'win-box');
    });
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetBtn.addEventListener('click', resetGame);