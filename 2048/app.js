document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;

    //* Creating a game board
    function createBoard() {
        for (let i=0; i<width*width; i++) {
            let square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }

        for (let i=1; i<=2; i++) {
            generate();
        }
        addLevelClass();

        document.addEventListener('keyup', control);
    }

    //* Generate a number rundomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        // console.log(randomNumber);

        if (squares[randomNumber].innerHTML == 0) {
            //* if field is empty (eq 0) assing 2
            squares[randomNumber].innerHTML = 2;

            checkForGameOver();
        } else {
            //* if field is not empty try to generate again on a difrent field
            generate();
        }
    }

    //* swipe horizontally
    function moveHorizontally(direction) {
        for (let i=0; i < (width*width); i++) {
            if (i % width === 0) {

                const row = [];
                for (let j=0; j < width; j++) {
                    row.push(parseInt(squares[i+j].innerHTML));
                }

                let filteredRow = row.filter(num => num);
                let zeros = Array(width - filteredRow.length).fill(0);
                
                let newRow = [];
                if (direction == 'right')
                    newRow = zeros.concat(filteredRow);
                else
                    newRow = filteredRow.concat(zeros);

                for (let j=0; j<newRow.length; j++) {
                    squares[i+j].innerHTML = newRow[j];
                }
            }
        }
    }

    function moveVertically(direction) {
        for (let i=0; i < width; i++) {

            const column = [];
            for (let j=0; j < width; j++) {
                column.push(parseInt(squares[i+(width*j)].innerHTML));
            }

            let filteredColumn = column.filter(num => num);
            let zeros = Array(width - filteredColumn.length).fill(0);

            let newColumn = [];
            if (direction == 'down')
                newColumn = zeros.concat(filteredColumn);
            else 
                newColumn = filteredColumn.concat(zeros);

            for (let j=0; j<newColumn.length; j++) {
                squares[i+(width*j)].innerHTML = newColumn[j];
            }
        }
    }

    function combineRow() {
        for (let i=0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {

                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }

        checkForWin();
    }

    function combineColumn() {
        for (let i=0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {

                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }

        checkForWin();
    }

    function control(e) {
        if (e.keyCode === 39) {
            // keyRight();
            moveHorizontally('right');
            combineRow();
            moveHorizontally('right');
            generate();
        } else if (e.keyCode === 37) {
            // keyLeft();
            moveHorizontally('left');
            combineRow();
            moveHorizontally('left');
            generate();
        } else if (e.keyCode === 38) {
            // keyUp();
            moveVertically('up');
            combineColumn();
            moveVertically('up');
            generate();
        } else if (e.keyCode === 40) {
            // keyDown();
            moveVertically('down');
            combineColumn();
            moveVertically('down');
            generate();
        }

        addLevelClass();
    }

    function checkForWin() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You win!';
                document.removeEventListener('keyup', control);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0)
                zeros++;
        }

        if (zeros === 0) {
            resultDisplay.innerHTML = 'You Lose!';
            document.removeEventListener('keyup', control);
        }
    }

    function addLevelClass() {
        for (let i=0; i < squares.length; i++) {
            switch (parseInt(squares[i].innerHTML)) {
                case 0: squares[i].className = ' level-0'; break;
                case 2: squares[i].className = ' level-2'; break;
                case 4: squares[i].className = ' level-4'; break;
                case 8: squares[i].className = ' level-8'; break;
                case 16: squares[i].className = ' level-16'; break;
                case 32: squares[i].className = ' level-32'; break;
                case 64: squares[i].className = ' level-64'; break;
                case 128: squares[i].className = ' level-128'; break;
                default: squares[i].className = ' level-999'; break;
            }
        }
    }

    createBoard();
});