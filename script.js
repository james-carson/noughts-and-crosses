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
    let player1Name = "Player One"
    let player1Symbol = "X"
    let player2Name = "Player Two"
    let player2Symbol = "O"

    const getNames = function () {
        player1Name = prompt("Player One, what is your name?", "Player One")
        alert(`Welcome, ${player1Name}!`)
        player1Symbol = prompt(`${player1Name}, would you like to play as X or O?`)
        if (player1Symbol === 'X' || 'O') {
            alert(`${player1Name} will play as ${player1Symbol}.`)
        } else {
            prompt(`Try again, ${player1Name}: enter X or O`)
        }

        player2Name = prompt("Player Two, what is your name?", "Player Two")
        alert(`Welcome, ${player2Name}!`)
        player2Symbol = prompt(`${player2Name}, would you like to play as X or O?`)
        if (player2Symbol === 'X' || 'O') {
            alert(`${player2Name} will play as ${player2Symbol}.`)
        } else {
            prompt(`Try again, ${player2Name}: enter X or O`)
        }

        return { player1Name, player2Name, player1Symbol, player2Symbol};
    }
    return getNames();
}

// Logic for resetting the board

const resetBoard = function () {

}

// Logic for playing a turn

const playTurn = function () {

}

// Logic for checking for a win

const checkWin = function () {

}