const Player = function (name) {
    let score = 0;

    let character = playerManager.getPlayers().length > 0 ? `X` : `O`;

    const displayInfo = () => `Player Name: ${name}, Score: ${score}`;

    const addScore = (value) => score += value;

    const getScore = () => score;

    const resetScore = () => score = 0;

    const getName = () => name;

    const getCharacter = () => character;

    return {
        displayInfo,
        addScore,
        getScore,
        resetScore,
        getName,
        getCharacter,
    }
}

const gameManager = (function () {
    let turns = 0;

    let currentPlayer;

    let previousWinner;

    const setupGame = () => {
        if (previousWinner) {
            DOM_manager.winner(false);
        }
        playerManager.clearPlayers();
        DOM_manager.resetDOM();
        boardManager.clearBoard();

        playerManager.addPlayer(Player(DOM_manager.playerName_inputValue(0) || `Player 1`));
        playerManager.addPlayer(Player(DOM_manager.playerName_inputValue(1) || `Player 2`));

        if (playerManager.getPlayers().length === 2) {
            currentPlayer = playerManager.getPlayer(2);
            switchCurrentPlayer();
        }
    }

    const getCurrentPlayer = () => currentPlayer ? currentPlayer : console.log(`No Current Player`);


    const switchCurrentPlayer = () => {
        if (currentPlayer === playerManager.getPlayer(1)) {
            currentPlayer = playerManager.getPlayer(2);
        } else {
            currentPlayer = playerManager.getPlayer(1);
        }
        DOM_manager.dialog(`${currentPlayer.getName()}: It's Your Turn`);
    }

    const addTurn = () => turns++;

    const getTurns = () => turns;

    const finishGame = (result) => {
        if (result) {
            DOM_manager.dialog(`${result.getName()} is the winner`);
            previousWinner = result.getName();
        } else {
            DOM_manager.dialog(`Its a Tie, Click "Play Game" to Restart`);
        }
    };

    return {
        setupGame,
        getCurrentPlayer,
        switchCurrentPlayer,
        finishGame,
        addTurn,
        getTurns,
    }
})();

const boardManager = (function () {
    let board = [
        [`A1`, `A2`, `A3`],
        [`B1`, `B2`, `B3`],
        [`C1`, `C2`, `C3`],
    ];

    const getBoard = () => board;

    const takeTurn = (player, choice, cell) => {
        if (player) {
            if (contains(choice)) {
                choice = choice.toUpperCase();
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < board[x].length; y++) {
                        if (board[x][y] === choice) {
                            board[x][y] = player;
                            cell.textContent = player.getCharacter();
                            gameManager.addTurn();
                            gameManager.switchCurrentPlayer();
                        }
                    }
                }
            } else {
                DOM_manager.dialog(`Tile Already Selected`, `error`);
                return;
            }
        } else {
            DOM_manager.dialog(`Game Not Started`, `error`);
            return;
        }

        let winner = checkWinner();
        if (winner) {
            gameManager.finishGame(winner);
            DOM_manager.winner(true);
        } else if (gameManager.getTurns() >= 9) {
            gameManager.finishGame(winner);
        }
    };

    const checkWinner = () => {
        // check rows
        for (let x = 0; x < 3; x++) {
            if (board[0][x] === board[1][x] && board[1][x] === board[2][x]) {
                return board[0][x];
            }
        }

        //check columns
        for (let x = 0; x < 3; x++) {
            if (board[x][0] === board[x][1] && board[x][1] === board[x][2]) {
                return board[x][0];
            }
        }

        //check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            return board[2][0];
        }

        return false;
    }

    const contains = (value) => {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                if (board[x][y] === value) {
                    return true;
                }
            }
        }
        return false;
    }

    const clearBoard = () => {
        board = [
            [`A1`, `A2`, `A3`],
            [`B1`, `B2`, `B3`],
            [`C1`, `C2`, `C3`],
        ];
    }

    return {
        takeTurn,
        getBoard,
        checkWinner,
        contains,
        clearBoard,
    }
})();

const playerManager = (function () {
    let players = [];

    const getPlayers = () => {
        let playerNames = [];
        for (let x = 0; x < players.length; x++) {
            playerNames.push(players[x].getName());
        }
        return playerNames;
    };

    const addPlayer = (playerName) => {
        if (players.length >= 2) {
            DOM_manager.dialog(`Max Player Count Reached`, `error`);
        } else if (!getPlayers().some(e => e === playerName.getName())) {
            players.push(playerName);
        } else {
            DOM_manager.dialog(`Choose Different Names`, `error`);
        }
    };

    const getPlayer = (player) => {
        if (player === 1 || player === 2) {
            return players[player - 1];
        } else {
            console.log(`Could not find Player: ${player}`, `error`);
        }
    }

    const clearPlayers = () => players = [];

    return {
        getPlayers,
        getPlayer,
        addPlayer,
        clearPlayers,
    }
})();

const DOM_manager = (function () {
    let cells = [];

    const dialogBox = document.getElementById(`dialog`);

    const dialog = (text, type = `general`) => {
        switch (type) {
            case `error`:
                dialogBox.style.color = `#c24040`;
                dialogBox.textContent = text;
                break;
            case `general`:
                dialogBox.style.color = ``;
                dialogBox.textContent = text;
                break;
            default:
                break;
        }
    }

    const storeCells = () => {
        let z = 1;
        for (let x = 0; x < 3; x++) {
            cells[x] = [];
            for (let y = 0; y < 3; y++) {
                z++;
                const cell = document.querySelector(`#cell:nth-of-type(${z})`);
                cells[x].push(cell);
                cell.addEventListener(`click`, function () {
                    boardManager.takeTurn(gameManager.getCurrentPlayer(), cell.getAttribute(`value`), this);
                })
            }
        }
    }

    const resetDOM = () => {
        for (let x = 0; x < cells.length; x++) {
            for (let y = 0; y < cells[x].length; y++) {
                cells[x][y].textContent = ``;
            }
        }
    }

    const playerName_inputValue = (value) => {
        let inputBox = document.querySelectorAll(`.inputContainer input`)[value];
        return inputBox.value;
    }

    const winner = (value) => {
        for (let x = 0; x < cells.length; x++) {
            for (let y = 0; y < cells[x].length; y++) {
                cells[x][y].classList.toggle(`winner`, value);
            }
        }
        dialogBox.classList.toggle(`winner`, value);
    }

    storeCells();

    return {
        dialog,
        resetDOM,
        playerName_inputValue,
        winner,
    }
})();