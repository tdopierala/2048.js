document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const squares = [];

    const scoreDisplay = document.querySelector('.score span');
    const startBtn = document.querySelector('.start');

    const width = 20;
    let currentIndex = 0;
    let appleIndex = 0;

    //* fo our snake 2 is the HEAD of a snake, 1's being the body of a snake and 0 being the TAIL
    let currentSnake = [2,1,0];

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    /**
     * Function generate playing board
     */
    function generateGrid() {
        console.log('generateGrid()');

        grid.style.width = (width * 10) + 'px';
        grid.style.height = (width * 10) + 'px';
        grid.innerHTML = '';
        for (let i=0; i<(width * width); i++) {
            let cell = document.createElement('div');
            cell.innerHTML = '';

            //// if (i === 0) cell.classList.add('snake');
            //// if (i === 24) cell.classList.add('apple');

            grid.appendChild(cell);
            squares.push(cell);
        }
    }

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerHTML = score;
        intervalTime = 500;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes() {

        //* handling events when the snake hits a border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits itself
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop(); // get the snake's tail and removed them form snake
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction) // adds new head of the snake according to the move direction

        //* handling the event when the snake eats en apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;

            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake');
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains('snake'));

        squares[appleIndex].classList.add('apple');
    }

    function control(e) {
        squares[currentIndex].classList.remove('snake'); // removing the class of snake from ALL the squares

        if (e.keyCode === 39) {
            //* if we press the right arrow, the snake will go right one div
            direction = 1;
        } else if (e.keyCode === 38) {
            //* if we press the up arrow, the snake will go back ten divs
            direction = -width;
        } else if (e.keyCode === 37) {
            //* if we press left arrow, the snake will go left one div
            direction = -1;
        } else if (e.keyCode === 40) {
            //* if we press down arrow, the snake will go forward ten div
            direction = +width;
        }
    }

    generateGrid();
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

});