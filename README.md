# JS-Snake-Game

Basic copy of the early 2000's mobile snake game. 

Game runs on a setInterval function that calls a number of functions every 0.1 seconds to create movement.

# Snakes Position
The snake is an array of arrays containing four numbers
with each number being a gid position. As the snake moves
the first array in the array is incremented or decremented
depending on which direction has been chosen, added to 
the front of the array whilst the last item in the array
is removed.

# Generating the Food
The food is created by randomly generating two numbers 
in a range and then assigning those numbers to grid areas.

# Grow the Snake
When the area of the snake head, represented by the first array
in the snakeArray matches the food array an addition grid
position is added to the snakeArray and current score
is incremented.

# Game Over
The game fails if either the position of the snake goes outside
of the grid area or the snakes head (first item in array) is
contained elsewhere in the snakeArray.
Either generate a game over message and the user can restart
the game by pressing an arrow key.