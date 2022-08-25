/*

Tasks to complete

Failure function
    - if the snake hits itself
    - if it goes out the grid

Grow the snake
    - use .include to check the foods position is within the position array. if true push extra position array
    - work out how to control which direction the growth goes in. May just need if statement to make sure it doesn't over lap

Delete the food
    - when the snake eats the food run function to delete current food, grow the snake and generate a new one

Difficulty option - set speed of the interval function - need event listener to start main function when arrow pressed
otherwise you can't set difficult before the function has already began.


*/

const container = document.querySelector('.game__container');
let positionArray = [[10, 14, 11, 15], [10, 15, 11, 16], [10, 16, 11, 17], [10, 17, 11, 18]];
let direction = "";
const difficulty = document.querySelector('.header__selector');
const food = document.createElement('div');
food.setAttribute('class', 'game__food');
let score = 0;
let foodPosition = [];


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




// Grow the snake when it touches the food
/*
 - don't delete the food just run movefood() to move it somewhere else
 - then catch the last array in position array and duplicate it on the end of that array
 - increment the score variable.
*/

const growSnake = () => {
    moveFood();
    const snakeSegment = positionArray[positionArray.length - 1];
    positionArray.push(snakeSegment);
    score++;
}



    setInterval(() => {
        if(direction == 'arrowright'){
            let arr = positionArray[0].map((item, index) => index % 2 != 0 ? item + 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();

            // Below isn't working correctly because the numbers could be included but we're not checking the order. get index involved somehow
            const checkLength = positionArray[0].filter(item => foodPosition.includes(item));
            if(checkLength.length == 4) {
                growSnake();
            }




            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
        } else if(direction == 'arrowleft'){
            let arr = positionArray[0].map((item, index) => index % 2 != 0 ? item - 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            const checkLength = positionArray[0].filter(item => foodPosition.includes(item));
            if(checkLength.length == 4) {
                growSnake();
            }
            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
        } else if(direction == 'arrowup'){
            let arr = positionArray[0].map((item, index) => index % 2 == 0 ? item - 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            const checkLength = positionArray[0].filter(item => foodPosition.includes(item));
            if(checkLength.length == 4) {
                growSnake();
            }
            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
        } else if(direction == 'arrowdown'){
            let arr = positionArray[0].map((item, index) => index % 2 == 0 ? item + 1 : item);
            positionArray.unshift(arr);
            positionArray.pop();
            const checkLength = positionArray[0].filter(item => foodPosition.includes(item));
            if(checkLength.length == 4) {
                growSnake();
            }
            container.innerHTML = "";
            container.appendChild(food);
            positionArray.forEach(item => {
                const snake = document.createElement('div');
                snake.setAttribute('class', 'game__snake');
                snake.style.gridArea = item.join(' / ');
                container.appendChild(snake);
            })
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