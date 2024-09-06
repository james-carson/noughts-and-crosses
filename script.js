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

// This is now working (v2!) - each cell has two values: cell (to ID it) and value (to replace later with X or 0)

// Logic for creation and storage of players

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

// Commented out while testing JS: ***************

// const setupPlayers = function () {

//     let player1Name = "Player One";
//     let player1Symbol = "X";
//     let player2Name = "Player Two";
//     let player2Symbol = "O";

//     const getPlayerInfo = function () {

//         // Setting up Player 1:

//         player1Name = prompt("Player One, what is your name?", "Player One");
//         alert(`Welcome, ${player1Name}!`);
//         console.log(`Player 1 has called themselves ${player1Name}`)

//         player1Symbol = prompt(`${player1Name}, would you like to play as X or O?`, "X");

//         while (player1Symbol !== 'X' && player1Symbol !== 'O') {
//             player1Symbol = prompt(`Try again, ${player1Name}: enter X or O`);
//         }

//         alert(`${player1Name} will play as ${player1Symbol}.`);
//         console.log(`P1 Symbol: ${player1Symbol}`)

//         // Setting up Player 2:

//         player2Name = prompt("Player Two, what is your name?", "Player Two");
//         alert(`Welcome, ${player2Name}!`);
//         console.log(`Player 2 has called themselves ${player2Name}`)

//         if (player1Symbol === 'X') {
//             player2Symbol = 'O';
//         } else if (player1Symbol === 'O') {
//             player2Symbol = 'X';
//         } else {
//             alert("Something went wrong...")
//         }
//         alert(`${player2Name} will play as ${player2Symbol}.`);
//         console.log(`P2 Symbol: ${player2Symbol}`)

//         // Return all player values

//         return { player1Name, player2Name, player1Symbol, player2Symbol };
//     }

//     return getPlayerInfo();
// }

// This line will automatically run the player setup function and populate the Player object with data

// const playersInfo = setupPlayers();

// const player1 = new Player(playersInfo.player1Name, playersInfo.player1Symbol);
// const player2 = new Player(playersInfo.player2Name, playersInfo.player2Symbol);

// console.log(player1);
// console.log(player2);

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

const setupPlayers = function () {

    let player1Name;;
    let player1Symbol;
    let player2Name;
    let player2Symbol;

    const getPlayerInfo = function () {

        const footer_top = document.getElementById("footer_top");
        const footer_bottom = document.getElementById("footer_bottom");
        footer_top.textContent = '';
        footer_bottom.textContent = '';


        // Player 1 Name

        const getPlayer1Name = function () {

            const label = document.createElement('label');

            label.textContent = "Player One, what is your name?";

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.id = 'player1NameInput';
            inputField.placeholder = 'Player One';

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';

            footer_top.textContent = footer_bottom.textContent
            footer_bottom.appendChild(label);
            footer_bottom.appendChild(inputField);
            footer_bottom.appendChild(submitButton);

            submitButton.addEventListener('click', () => {
                player1Name = inputField.value || 'Player One';
                footer_bottom.textContent = `Player 1 has called themselves ${player1Name}`;

                p1_name.textContent = player1Name;

                getPlayer1Symbol(player1Name);
            })
        }

        // Player 1 Symbol:

        const getPlayer1Symbol = function (player1Name) {

            const label = document.createElement('label');

            label.textContent = `${player1Name}, would you like to play as X or O?`;

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.id = 'player1SymbolInput';
            inputField.placeholder = 'X';

            // Need to add some validation in here!!*******

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';

            footer_top.textContent = footer_bottom.textContent
            footer_bottom.appendChild(label);
            footer_bottom.appendChild(inputField);
            footer_bottom.appendChild(submitButton);

            submitButton.addEventListener('click', () => {
                player1Symbol = inputField.value || 'X';
                footer_top.textContent = footer_bottom.textContent
                footer_bottom.textContent = `${player1Name} will play as ${player1Symbol}`;

                p1_symbol.textContent = player1Symbol;

                getPlayer2Name();
            })
        }

        // Player 2 Name

        const getPlayer2Name = function (player1Symbol) {

            const label = document.createElement('label');

            label.textContent = "Player Two, what is your name?";

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.id = 'player2NameInput';
            inputField.placeholder = 'Player Two';

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';

            footer_top.textContent = footer_bottom.textContent
            footer_bottom.appendChild(label);
            footer_bottom.appendChild(inputField);
            footer_bottom.appendChild(submitButton);

            submitButton.addEventListener('click', () => {
                player2Name = inputField.value || 'Player Two';
                footer_top.textContent = footer_bottom.textContent
                footer_bottom.textContent = `Player 2 has called themselves ${player2Name}`;

                p2_name.textContent = player2Name;

                getPlayer2Symbol(player2Name);
            })
        }

        // Player 2 Symbol

        const getPlayer2Symbol = function (player2Name) {

            if (player1Symbol === 'X') {
                player2Symbol = 'O';
            } else if (player1Symbol === 'O') {
                player2Symbol = 'X';
            }

            footer_top.textContent = footer_bottom.textContent
            footer_bottom.textContent = `${player2Name} will play as ${player2Symbol}`;
            p2_symbol.textContent = player2Symbol;
        }

        return { player1Name, player2Name, player1Symbol, player2Symbol };
    }

    getPlayerInfo();
}

const playersInfo = setupPlayers();

const player1 = new Player(playersInfo.player1Name, playersInfo.player1Symbol);
const player2 = new Player(playersInfo.player2Name, playersInfo.player2Symbol);

console.log(player1);
console.log(player2);