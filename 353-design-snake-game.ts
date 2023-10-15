// Design a Snake game that is played on a device with screen size = width x height. Play the game online if you are not familiar with the game.

// The snake is initially positioned at the top left corner (0,0) with length = 1 unit.

// You are given a list of food’s positions in row-column order. When a snake eats the food, its length and the game’s score both increase by 1.

// Each food appears one by one on the screen. For example, the second food will not appear until the first food was eaten by the snake.

// When a food does appear on the screen, it is guaranteed that it will not appear on a block occupied by the snake.

// Example:

// Given width = 3, height = 2, and food = [[1,2],[0,1]].

// Snake snake = new Snake(width, height, food);

// Initially the snake appears at position (0,0) and the food at (1,2).
// |S| | |
// | | |F|

// snake.move("R"); -> Returns 0
// | |S| |
// | | |F|

// snake.move("D"); -> Returns 0
// | | | |
// | |S|F|

// snake.move("R"); -> Returns 1 (Snake eats the first food and right after that, the second food appears at (0,1) )
// | |F| |
// | |S|S|

// snake.move("U"); -> Returns 1
// | |F|S|
// | | |S|

// snake.move("L"); -> Returns 2 (Snake eats the second food)
// | |S|S|
// | | |S|

// snake.move("U"); -> Returns -1 (Game over because snake collides with border)

type Coordinates = [number, number];
type Direction = 'U' | 'R' | 'D' | 'L';

class Snake {
	private width: number;
	private height: number;
	private food: Coordinates[];

	// tail -> head
	private snakeCoordinates: Coordinates[] = [[0, 0]];
	private snakeLength: number = 1;
	private dr: [-1, 0, 1, 0] = [-1, 0, 1, 0];
	private dc: [0, 1, 0, -1] = [0, 1, 0, -1];;
	private directionsMap = {U: 0, R: 1, D: 2, L: 3};

	constructor(width: number, height: number, food: Coordinates[]) {
		this.width = width;
		this.height = height;
		this.food = food;
	}

	move(direction: Direction) {
		if (this.snakeLength === -1) {
			return this.snakeLength;
		}
		const [lastRow, lastCol] = this.snakeCoordinates.at(-1);
		const di = this.directionsMap[direction];
		const newHeadCoordinates: Coordinates = [
			lastRow + this.dr[di],
			lastCol + this.dc[di],
		];
		// Check that the new snake head position is within bounds
		if (newHeadCoordinates[0] < 0 || newHeadCoordinates[0] === this.height ||
			newHeadCoordinates[1] < 0 || newHeadCoordinates[1] === this.width) {
			this.snakeLength = -1;
			return this.snakeLength;
		}
		const currentFood = this.food[this.snakeLength - 1];
		if (newHeadCoordinates[0] === currentFood[0] &&
			newHeadCoordinates[1] === currentFood[1]) {
			this.snakeLength += 1;
		} else {
			this.snakeCoordinates.splice(0, 1);
		}
		this.snakeCoordinates.push(newHeadCoordinates);
		return this.snakeLength - 1;
	}
}

// TEST CASES
const snake = new Snake(3, 2, [[1,2],[0,1]]);
console.log(snake.move("R")); // 0
console.log(snake.move("D")); // 0
console.log(snake.move("R")); // 1
console.log(snake.move("U")); // 1
console.log(snake.move("L")); // 2
console.log(snake.move("U")); // -1
