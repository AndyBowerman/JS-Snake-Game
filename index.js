/*

Tasks to complete



Difficulty option - set speed of the interval function - need event listener to start main function when arrow pressed
otherwise you can't set difficult before the function has already began.

Refactor everything into functions

improve the design

dark purple snake on grass?
things eaten are red?

little arrows that light up either side of the board as you press a direction

Change size of the grid?


*/

const container = document.querySelector('.game__container');
const restartButton = document.querySelector('.game__button');

// Default snake position
let snakePosition = [[10, 17, 11, 18]];
let direction = "";

const food = document.createElement('div');
food.setAttribute('class', 'game__food');
let foodPosition = [];


let currentScore = -1;
let bestScore = 0;


// Changes the foods position

const moveFood = () => {
    //randomly generate number within the range of grid places   
    let rowIndex = Math.floor(Math.random() * (25 - 1 + 1) + 1);
    let columnIndex = Math.floor(Math.random() * (50 - 1 + 1) + 1);
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
    snakePosition = [[10, 17, 11, 18]];
    updateBestScore();
    currentScore = -1;
    updateCurrentScore();
}

//Restart the game following death

const snakeDied = () => {
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


// Run snakeDied if snake goes off the grid.
// Can only travel head first so only need to check the head array.

const checkOnGrid = () => {
    const headArray = snakePosition[0];
    if(headArray[3] > 51 || headArray[3] <= 1 || headArray[2] > 26 || headArray[2] == 1) {
        snakeDied();
    }
}

// Check if the snake hits itself
// split snake into array containing the head and array containing the rest of the body.
// filter body array by head array and if length reaches four run snakeDied function.

const headWithinBody = () => {
    if(snakePosition.length > 1) {
        const bodyArray = [...snakePosition];
        const headArray = bodyArray.shift();
        const checkerArray = bodyArray.filter(item => item[0] == headArray[0] && item[1] == headArray[1] && item[2] == headArray[2] && item[3] == headArray[3]);
        if(checkerArray.length > 0 && checkerArray[0].length == 4) {
            snakeDied();
        }
    }
}


// Move the snake

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



// Below runs the whole game and calls functions passed in every 100ms.


    setInterval(() => {
        if(direction != "") {
            checkOnGrid();
            headWithinBody();
            growSnake();
            moveSnake();
        }                 
    }, 100);



// Sets direction the snake travels based on the arrow key pressed. Only runs if an arrow key is pressed 

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







restartButton.addEventListener('click', restartGame);