/*

Tasks to complete

Snake will be an array of arrays.

make snake die if it hits the side of the grid

function to randomly generate a new piece of food - somehow stop it generating where the snakes body is.

stop snake going back into itself - add to movement function 


*/

const container = document.querySelector('.game__container');
let positionArray = [[10, 14, 11, 15]];
let direction = "";

// Below moves the snake every second depending on what the direction value is.



setInterval(() => {
    if(direction == 'arrowright'){
        let arr = positionArray[0].map((item, index) => index % 2 != 0 ? item + 1 : item);
        positionArray.unshift(arr);
        positionArray.pop();
        container.innerHTML = "";
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
        container.innerHTML = "";
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
        container.innerHTML = "";
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
        container.innerHTML = "";
        positionArray.forEach(item => {
            const snake = document.createElement('div');
            snake.setAttribute('class', 'game__snake');
            snake.style.gridArea = item.join(' / ');
            container.appendChild(snake);
        })
    }
}, 200);




const setDirection = (e) => {
    const directionsArray = ['arrowup', 'arrowdown', 'arrowright', 'arrowleft'];
    if(directionsArray.includes(e.key.toLowerCase())) {
        direction = e.key.toLowerCase();
    }
}

document.body.addEventListener('keydown', setDirection);


// else if(direction == 'arrowleft'){
    //     let arr = positionArray.map((item, index) => index % 2 != 0 ? item - 1 : item);
    //     snake.style.gridArea = arr.join(" / ");
    //     positionArray = [...arr];
    // } else if(direction == 'arrowup'){
    //     let arr = positionArray.map((item, index) => index % 2 == 0 ? item - 1 : item);
    //     snake.style.gridArea = arr.join(" / ");
    //     positionArray = [...arr];
    // } else if(direction == 'arrowdown'){
    //     let arr = positionArray.map((item, index) => index % 2 == 0 ? item + 1 : item);
    //     snake.style.gridArea = arr.join(" / ");
    //     positionArray = [...arr];
    // } 