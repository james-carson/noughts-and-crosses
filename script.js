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

let activePlayer = 1

function switchPlayer() {
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1
    console.log(`Player switched to Player ${activePlayer}`)
}

const playGame = function (turnChoice) {
    if (activePlayer === 1) {
        turnChoice = parseInt(prompt(`${player1.name}, which square would you like your ${player1.symbol} in?`), 10);
    } else {
        turnChoice = parseInt(prompt(`${player2.name}, which square would you like your ${player2.symbol} in?`), 10);
    }

    console.log(`The player chose square ${turnChoice}`)

    if (turnChoice > 0 && turnChoice < 10) {
        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard.length; j++) {
                if (gameboard[i][j][0] === turnChoice) {
                    if (gameboard[i][j][1] === '') {
                        gameboard[i][j][1] = (activePlayer === 1 ? player1.symbol : player2.symbol);
                        console.log(`cell updated to ${gameboard[i][j][1]}`)
                    } else {
                        alert("Oops. Please choose another square.");
                        playGame();
                    }
                }
            }
        }
    } else {
        alert("Please enter a number between 1 and 9");
        playGame();
    }
    
    checkWin();
    // CHECKWIN NOT WORKING
    // checkFull(); NOT WORKING
    switchPlayer();
    console.log(`The player is now ${activePlayer}`)
    console.log(gameboard)
    // playGame(); - DISABLED FOR DEBUGGING
};

// This seems to be working - need to check with an actual game!

// Logic for resetting the board - This probably won't be needed

function resetBoard() {
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
}

// Logic for checking for a win - THIS DOESN'T WORK YET

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
        const [x, y, z] = winningConditions[i]
        console.log([x, y, z])
        console.log([x]);
        console.log([y]);
        console.log([z]);
        console.log(player1.symbol);
        console.log(player2.symbol);

        // I AM HERE - CHECKING THE X Y AND Z TO SEE WHAT THEY ARE CHECKING AGAINST

        // IS THE PROBLEM HERE? [X] IS NOT CHECKING AGAINST THE RIGHT THING?
        // IT SHOULDN'T BE CHECKING THE GAMEBOARD ITSELF, BUT THE SECOND PART OF ITS ARRAY!

        if (activePlayer === 1) {
            if (gameboard[x] === player1.symbol && gameboard[y] === player1.symbol && gameboard[z] === player1.symbol) {
                alert(`${player1} wins! The game will now reset`)
                resetBoard();
            } else if
                (gameboard[x] === player2.symbol && gameboard[y] === player2.symbol && gameboard[z] === player2.symbol) {
                alert(`${player2} wins! The game will now reset`)
                resetBoard();
            }
        }
    }
}

// THIS DOESNT WORK YET

function checkFull () {
        if (gameboard.every(cell => cell[1] !== '')) {
            alert("The board is full. Nobody wins!")
            resetBoard();
            setupPlayers();
        }
    }