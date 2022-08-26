/*

Tasks to complete



Failure function
    - if the snake hits itself
    - if it goes out the grid
    - Generate a failed Sign showing currentScore and high score and with restart button


Increment score & store highscore

Difficulty option - set speed of the interval function - need event listener to start main function when arrow pressed
otherwise you can't set difficult before the function has already began.


*/

const container = document.querySelector('.game__container');
let positionArray = [[10, 14, 11, 15]];
let direction = "";
const difficulty = document.querySelector('.header__selector');
const food = document.createElement('div');
food.setAttribute('class', 'game__food');
let currentScore = 0;
let highScore = 0;
const scoreCounter = document.querySelector('.header__score');
let foodPosition = [];
const restartButton = document.querySelector('.game__button');



// Changes the foods position

const moveFood = () => {   
    let rowIndex = Math.floor(Math.random() * (25 - 1 + 1) + 1);
    let columnIndex = Math.floor(Math.random() * (50 - 1 + 1) + 1);
    foodPosition = [rowIndex, columnIndex, rowIndex + 1, columnIndex + 1];
    if(!positionArray.includes(foodPosition)) {
        food.style.gridArea = foodPosition.join(' / ');
    } else {
        moveFood();
    }
}

moveFood();




const growSnake = () => {
    moveFood();
    const snakeSegment = positionArray[positionArray.length - 1];
    positionArray.push(snakeSegment);
    currentScore++;
    scoreCounter.innerText = `Current Score: ${currentScore}`;
}


// Restart if snake goes off the grid
// Can only travel head first so only need to check the head array.

const checkOnGrid = () => {
    const headArray = positionArray[0];
    if(headArray[3] > 51 || headArray[3] <= 1 || headArray[2] > 26 || headArray[2] <= 1) {
        restartGame();
    }
}





    setInterval(() => {
        if(direction == 'arrowright'){
            let arr = positionArray[0].map((item, index) => index % 2 != 0 ? item + 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            // Below is checking if the head of the snake touches the food
            if(positionArray[0][0] == foodPosition[0] && positionArray[0][1] == foodPosition[1] && positionArray[0][2] == foodPosition[2] && positionArray[0][3] == foodPosition[3]) {
                growSnake();
            }

            // // Check if the head of the snake touches the rest of the body
            // let bodyArray = [...positionArray];
            // let headArray = bodyArray.shift();
            // let checkerArray = bodyArray.filter(item => item[0] == headArray[0] && item[1] == headArray[1] && item[2] == headArray[2] && item[3] == headArray[3]);
            // if(checkerArray.length > 0) {
            //     if(checkerArray[0].length == 4) {
            //         deathFunction();
            //     }
            // }

            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
            checkOnGrid();
        } else if(direction == 'arrowleft'){
            let arr = positionArray[0].map((item, index) => index % 2 != 0 ? item - 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            // Below is checking if the head of the snake touches the food
            if(positionArray[0][0] == foodPosition[0] && positionArray[0][1] == foodPosition[1] && positionArray[0][2] == foodPosition[2] && positionArray[0][3] == foodPosition[3]) {
                growSnake();
            }

            // // Check if the head of the snake touches the rest of the body
            // let bodyArray = [...positionArray];
            // let headArray = bodyArray.shift();
            // let checkerArray = bodyArray.filter(item => item[0] == headArray[0] && item[1] == headArray[1] && item[2] == headArray[2] && item[3] == headArray[3]);
            // if(checkerArray.length > 0) {
            //     if(checkerArray[0].length == 4) {
            //         deathFunction();
            //     }
            // }

            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
            checkOnGrid();
        } else if(direction == 'arrowup'){
            let arr = positionArray[0].map((item, index) => index % 2 == 0 ? item - 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            // Below is checking if the head of the snake touches the food
            if(positionArray[0][0] == foodPosition[0] && positionArray[0][1] == foodPosition[1] && positionArray[0][2] == foodPosition[2] && positionArray[0][3] == foodPosition[3]) {
                growSnake();
            }

            // // Check if the head of the snake touches the rest of the body
            // let bodyArray = [...positionArray];
            // let headArray = bodyArray.shift();
            // let checkerArray = bodyArray.filter(item => item[0] == headArray[0] && item[1] == headArray[1] && item[2] == headArray[2] && item[3] == headArray[3]);
            // if(checkerArray.length > 0) {
            //     if(checkerArray[0].length == 4) {
            //         deathFunction();
            //     }
            // }


            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
            checkOnGrid();
        } else if(direction == 'arrowdown'){
            let arr = positionArray[0].map((item, index) => index % 2 == 0 ? item + 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            // Below is checking if the head of the snake touches the food
            if(positionArray[0][0] == foodPosition[0] && positionArray[0][1] == foodPosition[1] && positionArray[0][2] == foodPosition[2] && positionArray[0][3] == foodPosition[3]) {
                growSnake();
            }

            //  // Check if the head of the snake touches the rest of the body
            // let bodyArray = [...positionArray];
            // let headArray = bodyArray.shift();
            // let checkerArray = bodyArray.filter(item => item[0] == headArray[0] && item[1] == headArray[1] && item[2] == headArray[2] && item[3] == headArray[3]);
            // if(checkerArray.length > 0) {
            //     if(checkerArray[0].length == 4) {
            //         deathFunction();
            //     }
            // }


            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
            checkOnGrid();
        }
    }, 150)




const setDirection = (e) => {
    const directionsArray = ['arrowup', 'arrowdown', 'arrowright', 'arrowleft'];
    if(directionsArray.includes(e.key.toLowerCase())) {
        if(e.key.toLowerCase() == 'arrowright' && direction != 'arrowleft'){
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




const restartGame = () => {
    positionArray = [[10, 14, 11, 15]];
    currentScore = 0;
    direction = "";
    moveFood();
    container.innerHTML = "";
}


restartButton.addEventListener('click', restartGame);