// Set up the gameboard as a 3x3 grid

const gameboard = function () {
    const columns = 3;
    const rows = 3;
    const board = [];
    let cellRef = 1;

    for (let i = 0; i < columns; i++) {
        board[i] = [];
        for (let j = 0; j < rows; j++) {
            board[i].push(cellRef);
            cellRef++;
        }
    }
    return board;
}();

// Need to have cells so that their value can change! Index?********************


// Logic for creation and storage of players

// Do I need to setup some player objects here?

const setupPlayers = function () {
    let player1Name = "Player One"
    let player2Name = "Player Two"

    const getNames = function () {
        player1Name = prompt("Player One, what is your name?", "Player One")
        player2Name = prompt("Player Two, what is your name?", "Player Two")
        return {player1Name, player2Name};
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