const TicTacToe = (function() {

    const Gameboard = (function() {

        const board = [
            null, null, null, // 0, 1, 2
            null, null, null, // 3, 4, 5
            null, null, null, // 6, 7, 8
        ];

        function _refreshDisplay() {
            for (let i = 0; i < Gameboard.board.length; i++) {
                const tile = Gameboard.board[i];
                const element = document.querySelectorAll('.gameBoard__box')[i];
                const mark = element.querySelector('.gameBoard__box__mark');
                mark.textContent = tile;
            }
        }

        function reset() {
            for (let i = 0; i < board.length; i++) { board[i] = null; }
            _refreshDisplay();
        }

        function init() {
            const tiles = document.querySelectorAll('.gameBoard__box');
            tiles.forEach(tile => tile.addEventListener('click', _markTile));
            _refreshDisplay();
        }

        function _markTile() {
            const markElement = this.querySelector('.gameBoard__box__mark');
            if (markElement.textContent !== '') { return; }
            board[this.dataset.index] = Game.getActivePlayer().marker
            markElement.textContent = board[this.dataset.index];
            Game.endTurn();
        }

        return { board, init, reset };

    })();

    const Game = (function() {

        const winningCombinations = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];

        const _Player1 = _Player('Player 1', 'X');
        const _Player2 = _Player('Player 2', 'O');

        let _activePlayer = _Player1;

        function getActivePlayer() { return _activePlayer; }

        function endTurn() {
            if (_checkForWinner(_activePlayer, Gameboard.board)) {
                Gameboard.reset();
                _activePlayer = _Player1;
            } else {
                _activePlayer === _Player1? _activePlayer = _Player2 : _activePlayer = _Player1;
            }
        }

        function _Player(name, marker) {
            return { name, marker }
        }

        function _checkForWinner(player, board) {
            let isWinner = false;
            const selections = [];
            for (let i = 0; i < board.length; i++) {
                const tile = board[i];
                if (tile === player.marker) {
                    selections.push(i);
                }
            }
            if (selections.length < 3) { return isWinner = false; }
            comboLoop:
            for (combo of winningCombinations) {
                for (tile of combo) {
                    if (!selections.includes(tile)) { continue comboLoop; }
                }
                isWinner = true;
                alert(`${player.name} wins`);
            }
            return isWinner;
        }

        return { getActivePlayer, endTurn };

    })();

    return { init: () => Gameboard.init() };

})();

TicTacToe.init();