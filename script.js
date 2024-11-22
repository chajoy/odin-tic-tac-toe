const boardManager = (function () {
    let board =
        [`A1`, `A2`, `A3`,
            `B1`, `B2`, `B3`,
            `C1`, `C2`, `C3`];

    let players = [];

    getBoard = () => board;

    startGame = () => {

    }


    takeTurn = (player, input) => {
        player = player.toLowerCase();
        player === `x` || player.toLowerCase === `o` ?
            board[board.indexOf(input)] = player :
            console.error(`Incorrect Input, Try Again`);
    };

    return {
        getBoard,
        takeTurn
    }
})();

const playerManager = (function () {
    let players = [];

    showPlayers = () => players;

    addPlayer = (player) => {
        players.length >= 2 ?
            console.error(`Max Player Count Reached`) :
            players.push(player);
    };

    return {
        showPlayers,
        addPlayer
    }
})();

const player = function (name) {
    let score = 0;

    addScore = () => score++;

    showScore = () => `${name}: ${score}`;

    return {
        name,
        addScore,
        showScore
    }
}

playerManager.addPlayer(player(`player1`));
playerManager.addPlayer(player(`player2`));

