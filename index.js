/*

Tasks to complete

setInterval(function, 200) -> calls the funciton passed in every 200ms.

make the snakes position move - if pressed up, down, left or right change the grid area
up - increase 1st & 3rd
down - decrease
right - increase 2nd & 4th
left - decrease


*/

const container = document.querySelector('.game__container');
const snake = document.querySelector('.game__snake');
let positionArray = [10, 14, 11, 15];
const direction = "down";

const func = () => {
    // let arr = positionArray.map(item => item + 1);
    // snake.style.gridArea = arr.join(" / ");
    // positionArray = [...arr];
    // console.log(positionArray);

    if(direction == 'right'){
        let arr = positionArray.map((item, index) => index % 2 != 0 ? item + 1 : item);
        snake.style.gridArea = arr.join(" / ");
        positionArray = [...arr];
    } else if(direction == 'down'){
        let arr = positionArray.map((item, index) => index % 2 == 0 ? item + 1 : item);
        snake.style.gridArea = arr.join(" / ");
        positionArray = [...arr];
    } 
}

func();

func();