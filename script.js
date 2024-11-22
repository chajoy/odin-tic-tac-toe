const gameManager = (function () {
    let winner;

    const startGame = () => {
        for (let x = 1; x <= 2; x++) {
            let _player = prompt(`Player ${x}, Enter Name`);
            playerManager.addPlayer(Player(_player));
        }
    }

    return {
        winner,
        startGame,
    }
})();

const boardManager = (function () {
    let board = [
        `A1`, `A2`, `A3`,
        `B1`, `B2`, `B3`,
        `C1`, `C2`, `C3`
    ];

    const getBoard = () => board;

    const displayBoard = () => {
        let y = 0;
        for (let x = 0; x < 3; x++) {
            console.log(`${board[y]} || ${board[y + 1]} || ${board[y + 2]}`);
            y += 3;
        }
    }

    const takeTurn = (player, input) => {
        player = player.toLowerCase();
        player === `x` || player.toLowerCase === `o` ?
            boardManager.board[board.indexOf(input)] = player :
            console.error(`Incorrect Input, Try Again`);
    };

    return {
        displayBoard,
        takeTurn,
        getBoard,
    }
})();

const playerManager = (function () {
    let players = [];

    const getPlayers = () => players;

    const addPlayer = (player) => {
        players.length >= 2 ?
            console.error(`Max Player Count Reached`) :
            players.push(player);
    };

    const getPlayer = (player) => {
        if (player === 1 || player === 2) {
            return players[player - 1];
        } else {
            console.error(`Could not find player${player}`);
        }
    }

    return {
        getPlayers,
        getPlayer,
        addPlayer
    }
})();

const Player = function (name) {
    let score = 0;

    const displayInfo = () => `Player Name: ${name}, Score: ${score}`;

    const addScore = (value) => score += value;

    const getScore = () => score;

    const resetScore = () => score = 0;

    return {
        displayInfo,
        addScore,
        getScore,
        resetScore,
    }
}
