// Set up the gameboard as a 3x3 grid

const gameboard = function () {
    const columns = 3;
    const rows = 3;
    const board = [];
    let cell = 1;
    let value = '';

    for (let i = 0; i < columns; i++) {
        board[i] = [];
        for (let j = 0; j < rows; j++) {
            board[i].push([cell, value]);
            cell++;
        }
    }
    return board;
}();

// This is now working - each cell has two values: cell (to ID it) and value (to replace later with X or 0)

// Logic for creation and storage of players

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

const setupPlayers = function () {

    let player1Name = "Player One";
    let player1Symbol = "X";
    let player2Name = "Player Two";
    let player2Symbol = "O";

    const getPlayerInfo = function () {

        // Setting up Player 1:

        player1Name = prompt("Player One, what is your name?", "Player One");
        alert(`Welcome, ${player1Name}!`);

        player1Symbol = prompt(`${player1Name}, would you like to play as X or O?`, "X");

        while (player1Symbol !== 'X' && player1Symbol !== 'O') {
            player1Symbol = prompt(`Try again, ${player1Name}: enter X or O`);
        }

        alert(`${player1Name} will play as ${player1Symbol}.`);

        // Setting up Player 2:

        player2Name = prompt("Player Two, what is your name?", "Player Two");
        alert(`Welcome, ${player2Name}!`);

        if (player1Symbol === 'X') {
            player2Symbol = 'O';
        } else if (player1Symbol === 'O') {
            player2Symbol = 'X';
        } else {
            alert("Something went wrong...")
        }
        alert(`${player2Name} will play as ${player2Symbol}.`);

        // Return all player values

        return { player1Name, player2Name, player1Symbol, player2Symbol };
    }

    return getPlayerInfo();
}

// This line will automatically run the player setup function and populate the Player object with data

const playersInfo = setupPlayers();

const player1 = new Player(playersInfo.player1Name, playersInfo.player1Symbol);
const player2 = new Player(playersInfo.player2Name, playersInfo.player2Symbol);

// Player setup is now working!

// TODO - Now to start playing the game itself************

// Logic for resetting the board

const resetBoard = function () {

}

// Logic for playing a turn

const playTurn = function () {

}

// Logic for checking for a win

const checkWin = function () {

}