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

const playGame = function (turnChoice) {
    if (activePlayer === 1) {
        turnChoice = parseInt(prompt(`${player1.name}, which square would you like your ${player1.symbol} in?`), 10);
    } else {
        turnChoice = parseInt(prompt(`${player2.name}, which square would you like your ${player2.symbol} in?`), 10);
    }

    console.log(`Player ${activePlayer} chose square ${turnChoice}`)
    console.log(`This means that the target cell should be ${turnChoice - 1}, which has an ID of ${gameboard[turnChoice - 1][0]}. The value there is currently ${gameboard[turnChoice - 1][1]}`)

    if (turnChoice > 0 && turnChoice < 10) {

        if (gameboard[turnChoice - 1][1] === undefined) {
            // ChatGPT says this should be ''
            if (activePlayer === 1) {
                gameboard[turnChoice - 1][1] = player1.symbol;
                console.log(`cell ID ${gameboard[turnChoice - 1][0]} updated to ${gameboard[turnChoice - 1][1]}`);
            } else if (activePlayer === 2) {
                gameboard[turnChoice - 1][1] = player2.symbol;
                console.log(`cell ID ${gameboard[turnChoice - 1][0]} updated to ${gameboard[turnChoice - 1][1]}`);
            }
        } else {
            alert("Oops. Please choose another square.");
            playGame();
        }
    } else {
        alert("Please enter a number between 1 and 9");
        playGame();
    }

    const winner = checkWin();
    console.log("checkWin() just ran. Did it work?!");

    if (winner) {
        console.log(`${winner} has won!`);
        return;
    }

    const full = checkFull();

    if (full) {
        console.log("The board is full");
        return;
    }

    switchPlayer();
    console.log(`The player is now ${activePlayer}`)
    console.log(gameboard)
    playGame();
};

// Logic for resetting the board - This probably won't be needed

function resetBoard() {
    const cellsRequired = 9;
    const board = [];
    let cell = 1;
    let value = '';

    for (let i = 0; i < cellsRequired; i++) {
        board[i] = [];
        board[i].push([cell, value]);
        cell++;
    }
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
        [1, 5, 8],
        [3, 5, 7]
    ];

    for (let i = 0; i < winningConditions.length; i++) {

        let Xcount = 0;
        let Ocount = 0;

        for (let j = 0; j < winningConditions[i].length; j++) {

            let checkCell = ((winningConditions[i][j]) - 1);

            console.log(`Check ref: ${i},${j}`)
            console.log(`Cell being checked now is ${checkCell}. The ID of that cell is ${gameboard[checkCell][0]} What is in that cell is ${gameboard[checkCell][1]}`)

            if (gameboard[checkCell][1] === 'X') {
                Xcount++;

            } else if (gameboard[checkCell][1] === 'O') {
                Ocount++;
            }

            if (Xcount === 3) {
                alert(`${player1.name} wins!`);
                return 'Xwin';
            } else if (Ocount === 3) {
                alert(`${player2.name} wins!`);
                return 'Owin';
            }

            console.log(`Xcount = ${Xcount}`);
            console.log(`Ocount = ${Ocount}`);
        }
    }
}

function checkFull() {
    if (gameboard.every(cell => cell[1] !== undefined)) {
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

const setupPlayers = () => {

    setTimeout(() => {
        const footer_top = document.getElementById("footer_top");
        const footer_bottom = document.getElementById("footer_bottom");

        footer_top.textContent = 'Welcome to Tic Tac... Wait, no, that\'s not right...';
        footer_bottom.textContent = 'Welcome to Noughts and Crosses!';

        // Get Player 1 Name:

        setTimeout(() => {
            let player1Name = prompt("Player One, what is your name?", "Player One");

            footer_top.textContent = footer_bottom.textContent;
            footer_bottom.textContent = `Player 1 has called themselves ${player1Name}`;

            p1_name.textContent = player1Name;

            // Get Player 1 Symbol:

            setTimeout(() => {
                let player1Symbol;
                do {
                    player1Symbol = prompt(`${player1Name}, would you like to play as X or O?`, 'X');
                } while (player1Symbol !== 'X' && player1Symbol !== 'O');

                footer_top.textContent = footer_bottom.textContent;
                if (player1Symbol = 'X') {
                    footer_bottom.textContent = `${player1Name} will play as ${player1Symbol}`;
                    p1_symbol.textContent = player1Symbol;
                    // I want to come back and add an image here!
                }


                // Get Player 2 Name:

                setTimeout(() => {
                    let player2Name = prompt("Player Two, what is your name?", 'Player Two');

                    footer_top.textContent = footer_bottom.textContent;
                    footer_bottom.textContent = `Player 2 has called themselves ${player2Name}`;

                    p2_name.textContent = player2Name;

                    // Get Player 2 Symbol:

                    setTimeout(() => {
                        let player2Symbol = player1Symbol === 'X' ? 'O' : 'X';
                        alert(`${player2Name} will play as ${player2Symbol}`)

                        footer_top.textContent = footer_bottom.textContent
                        footer_bottom.textContent = `${player2Name} will play as ${player2Symbol}`;
                        p2_symbol.textContent = player2Symbol;

                        return { player1Name, player1Symbol, player2Name, player2Symbol };

                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }, 100);
}

const playersInfo = setupPlayers();

const player1 = new Player(playersInfo.player1Name, playersInfo.player1Symbol);
const player2 = new Player(playersInfo.player2Name, playersInfo.player2Symbol);

console.log(player1);
console.log(player2);

// To-do - NEXT STEPS/IMPORTANT:
// --Set-up event listeners for the buttons so that they are clickable and run the game properly.

// To-do - Medium:
// Ensure that player switching shows up in the text box

// To-do - Minor:
// Add images for the 'Playing as:' sections of the board
// Add a reset button?
// Check line 48 - may need to be switched. This is if (gameboard[turnChoice - 1][1] === undefined) { to if (gameboard[turnChoice - 1][1] === '') {

// Logic for listening for and handling clicks for players taking turns:

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', function () {
        if (!cell.textContent) {
            if (activePlayer === 1) {
                cell.textContent = player1.symbol;
            } else {
                cell.textContent = player2.symbol;
            }

            const winner = checkWin();
            if (winner) {
                footer_top.textContent = footer_bottom.textContent
                footer_bottom.textContent = `${winner} has won!`;
                return;
            }

            if (checkFull()) {
                footer_top.textContent = footer_bottom.textContent
                footer_bottom.textContent = "The board is full. Nobody wins!!";
                return;
            }

            switchPlayer();

        } else {
            footer_top.textContent = footer_bottom.textContent
            footer_bottom.textContent = "That cell is already taken. Choose another one.";
        }
    });
});