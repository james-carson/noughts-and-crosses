// Set up the gameboard as a 1D array:

const gameboard = function () {
    const cellsRequired = 9;
    const board = [];
    let cell = 1;
    let value = '';

    for (let i = 0; i < cellsRequired; i++) {
        board[i] = [];
        board[i].push([cell, value]);
        cell++;
    }

    return board;
}();

// Logic for creation and storage of players

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

// Active player and player switching logic:

let activePlayer = 1;

function switchPlayer() {
    console.log(`The current Player is ${activePlayer}`)
    activePlayer = (activePlayer === 1) ? 2 : 1;
    console.log(`Player switched to Player ${activePlayer}`)
}

// Logic for updating the footer text:

function updateTurnText() {
    if (activePlayer === 1) {
        footer.textContent = `${player1.name}, which square would you like your ${player1.symbol} in?`;
    } else {
        footer.textContent = `${player2.name}, which square would you like your ${player2.symbol} in?`;
    }
}

// Logic for resetting the board - This probably won't be needed

function resetBoard() {

    console.log("Resetting Board")

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = '';
        gameboard[index][1] = '';
        console.log(`Reset: ${gameboard[index][1]}`);
    });

console.log("Reset complete")

    activePlayer = 1;
    updateTurnText();
}

// Logic for checking for a win - now mostly working, except doesn't stop playing after a win

const checkWin = function () {

    const winningConditions = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let i = 0; i < winningConditions.length; i++) {

        let Xcount = 0;
        let Ocount = 0;

        for (let j = 0; j < winningConditions[i].length; j++) {

            let checkCell = ((winningConditions[i][j]) - 1);

            console.log(`Checking combination ${winningConditions[i]}`);
            console.log(`Check ref: ${i},${j}`);
            console.log(`Cell being checked now is ${checkCell}. The ID of that cell is ${gameboard[checkCell][0]} What is in that cell is ${gameboard[checkCell][1]}`);

            if (gameboard[checkCell][1] === 'X') {
                Xcount++;

            } else if (gameboard[checkCell][1] === 'O') {
                Ocount++;
            }

            if (Xcount === 3) {
                alert(`${player1.name} wins!`);
                return `${player1.name}`;
            } else if (Ocount === 3) {
                alert(`${player2.name} wins!`);
                return `${player2.name}`;
            }

            console.log(`Xcount = ${Xcount}`);
            console.log(`Ocount = ${Ocount}`);
        }
    }
}

function checkFull() {
    if (gameboard.every(cell => cell[1] === 'X' || cell[1] === 'O')) {
        alert("The board is full. Nobody wins!")
        return true;
    }
    return false;
}

// From here is the code to play the game with the interface:

const p1_name = document.getElementById("p1_name");
const p1_symbol = document.getElementById("p1_symbol");
const p2_name = document.getElementById("p2_name");
const p2_symbol = document.getElementById("p2_symbol");

const cells = Array.from(document.querySelectorAll('.cell'));

const setupPlayers = () => {

    // Get Player 1 Name:

    let player1Name = prompt("Player One, what is your name?", "Player One");
    p1_name.textContent = player1Name;

    // Get Player 1 Symbol:

    let player1Symbol;
    do {
        player1Symbol = prompt(`${player1Name}, would you like to play as X or O?`, 'X');
    } while (player1Symbol !== 'X' && player1Symbol !== 'O');
    p1_symbol.textContent = player1Symbol;
    // I want to come back and add an image here!

    // Get Player 2 Name:

    let player2Name = prompt("Player Two, what is your name?", 'Player Two');
    p2_name.textContent = player2Name;

    // Get Player 2 Symbol:

    let player2Symbol = player1Symbol === 'X' ? 'O' : 'X';
    alert(`${player2Name} will play as ${player2Symbol}`)
    p2_symbol.textContent = player2Symbol;

    return { player1Name, player1Symbol, player2Name, player2Symbol };
}

const playersInfo = setupPlayers();

const player1 = new Player(playersInfo.player1Name, playersInfo.player1Symbol);
const player2 = new Player(playersInfo.player2Name, playersInfo.player2Symbol);

console.log(player1);
console.log(player2);

const footer = document.getElementById("footer");

function playGame() {

    console.log("GAME INITIATED")

    updateTurnText();

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {

            if (!cell.textContent) {
                const currentSymbol = activePlayer === 1 ? player1.symbol : player2.symbol;
                cell.textContent = currentSymbol;
                gameboard[index][1] = currentSymbol;
                console.log(`${currentSymbol} has just been placed in cell ref ${gameboard[index][0]}`)

                cell.classList.add(currentSymbol === 'X' ? 'x-symbol' : 'o-symbol');

                const winner = checkWin();
                if (winner) {
                    footer.textContent = `${winner} has won!`;
                    return;
                }

                if (checkFull()) {
                    footer.textContent = "The board is full. Nobody wins!!";
                    return;
                }

                switchPlayer();
                updateTurnText();
                playGame();

            }
        });
    });
};

playGame();

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', resetBoard);

// To-do - Minor:
// Add images for the 'Playing as:' sections of the board