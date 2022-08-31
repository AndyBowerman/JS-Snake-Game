const container = document.querySelector('.game__container');
const restartButton = document.querySelector('.game__button');

let snakePosition = [[10, 14, 11, 15]]; // Default snake position
let direction = "";

const food = document.createElement('div');
food.setAttribute('class', 'game__food');

let foodPosition = [];

let currentScore = -1;
let bestScore = 0;

const difficultySelector = document.querySelector('.header__difficulty--options');
let myInterval = "";
let speed = 100;



// Sets direction the snake travels based on the arrow key pressed. Only runs if an arrow key is pressed
// Only accepts arrow keys and won't allow you to go right if already travelling left etc.

const setDirection = (e) => {
    const directionsArray = ['arrowup', 'arrowdown', 'arrowright', 'arrowleft'];
    if(directionsArray.includes(e.key.toLowerCase())) {
        if(direction == "") {
            restartGame();
            direction = e.key.toLowerCase();
        } else if(e.key.toLowerCase() == 'arrowright' && direction != 'arrowleft'){
            direction = e.key.toLowerCase();
        } else if(e.key.toLowerCase() == 'arrowleft' && direction != 'arrowright'){
            direction = e.key.toLowerCase();
        } else if(e.key.toLowerCase() == 'arrowup' && direction != 'arrowdown'){
            direction = e.key.toLowerCase();
        } else if(e.key.toLowerCase() == 'arrowdown' && direction != 'arrowup'){
            direction = e.key.toLowerCase();
        }    
    }
}

document.body.addEventListener('keydown', setDirection);



// Changes the foods position

const moveFood = () => {
    //randomly generate number within the range of grid places   
    let rowIndex = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    let columnIndex = Math.floor(Math.random() * (30 - 1 + 1) + 1);
    foodPosition = [rowIndex, columnIndex, rowIndex + 1, columnIndex + 1];
    // check position of food isn't within the snake, otherwise call function again
    if(!snakePosition.includes(foodPosition)) {
        food.style.gridArea = foodPosition.join(' / ');
    } else {
        moveFood();
    }
}

moveFood();

// Restart the game on button click

const restartGame = () => {
    direction = "";
    moveFood();
    container.innerHTML = "";
    snakePosition = [[10, 14, 11, 15]];
    updateBestScore();
    currentScore = -1;
    updateCurrentScore();
}

restartButton.addEventListener('click', restartGame);

// Display game over message after death and updates current and best scores

const gameOver = () => {
    direction = "";
    const gameOver = document.createElement('div');
    gameOver.setAttribute('class', 'game__over');
    const gameOverHeader = document.createElement('h1');
    gameOver.appendChild(gameOverHeader);
    container.appendChild(gameOver);
    gameOverHeader.innerText = "Game Over";
    updateBestScore();
    currentScore = -1;
    updateCurrentScore();
}

// Update current score

const updateCurrentScore = () => {
    currentScore++;
    document.querySelector('.header__currentScore').innerText = `Current Score: ${currentScore}`;
}

updateCurrentScore();

//Update best score

const updateBestScore = () => {
    if(currentScore > bestScore) {
        bestScore = currentScore;
    }
    document.querySelector('.header__bestScore').innerText = `Best Score: ${bestScore}`;
}

updateBestScore();

// check if snakes head enters the same grid area as the food and then grows in the direction decided by the current direction the snakes traveling in

const growSnake = () => {
    if(snakePosition[0][0] == foodPosition[0] && snakePosition[0][1] == foodPosition[1] && snakePosition[0][2] == foodPosition[2] && snakePosition[0][3] == foodPosition[3]) {
        moveFood();
        if(direction == 'arrowright'){
            let arr = snakePosition[0].map((item, index) => index % 2 != 0 ? item + 1 : item);
            snakePosition.push(arr);
        } else if(direction == 'arrowleft'){
            let arr = snakePosition[0].map((item, index) => index % 2 != 0 ? item - 1 : item);
            snakePosition.push(arr);
        } else if(direction == 'arrowup'){
            let arr = snakePosition[0].map((item, index) => index % 2 == 0 ? item - 1 : item);
            snakePosition.push(arr);
        } else if(direction == 'arrowdown'){
            let arr = snakePosition[0].map((item, index) => index % 2 == 0 ? item + 1 : item);
            snakePosition.unshift(arr);
        }
        updateCurrentScore();
    }    
}


// Run gameOver if snake goes off the grid.
// Can only travel head first so only need to check the head array is within the grid area

const checkOnGrid = () => {
    const headArray = snakePosition[0];
    if(headArray[3] > 31 || headArray[3] <= 1 || headArray[2] > 21 || headArray[2] <= 1) {
        gameOver();
    }
}

// Check if the snake hits itself
// split snake into two arrays containing the head and body.
// filter body array by head array and if length reaches four run gameOver function.

const headWithinBody = () => {
    if(snakePosition.length > 1) {
        const bodyArray = [...snakePosition];
        const headArray = bodyArray.shift();
        const checkerArray = bodyArray.filter(item => item[0] == headArray[0] && item[1] == headArray[1] && item[2] == headArray[2] && item[3] == headArray[3]);
        if(checkerArray.length > 0 && checkerArray[0].length == 4) {
            gameOver();
        }
    }
}


// Move the snake
// Movement created by removing last area of areas and adding new one to the front with either rows or columns incremented or decremented.
// Create a div for each array of arrays within the snakePosition array. On each iteration of the interval function it moves the snake across the grid.

const moveSnake = () => {
    let arr = [];
    if(direction != ""){
        if(direction == 'arrowright'){
            arr = snakePosition[0].map((item, index) => index % 2 != 0 ? item + 1 : item);
        } else if(direction == 'arrowleft'){
            arr = snakePosition[0].map((item, index) => index % 2 != 0 ? item - 1 : item);
        } else if(direction == 'arrowup'){
            arr = snakePosition[0].map((item, index) => index % 2 == 0 ? item - 1 : item);
        } else if(direction == 'arrowdown'){
            arr = snakePosition[0].map((item, index) => index % 2 == 0 ? item + 1 : item);
        }

        snakePosition.unshift(arr);
        snakePosition.pop();            
        container.innerHTML = "";
        container.appendChild(food);
        snakePosition.forEach(item => {
            const snake = document.createElement('div');
            snake.setAttribute('class', 'game__snake');
            snake.style.gridArea = item.join(' / ');
            container.appendChild(snake);
        })
    }
}


// Interval calls above funcitons every 0.1 secs (default) creating all the movement on the page.

const runGame = () => {
    myInterval = setInterval(() => {
        if(direction != "") {
            checkOnGrid();
            headWithinBody();
            growSnake();
            moveSnake();
        }                 
    }, speed);
}

runGame();

// To change level must stop the setInterval, assign the new speed setting and restart the interval. 

const changeLevel = (e) => {
    clearInterval(myInterval);
    speed = e.target.value;
    runGame();
}

difficultySelector.addEventListener('change', changeLevel);