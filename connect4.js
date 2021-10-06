/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// Button to restart game
document.querySelector('#restartButton').addEventListener('click', function () {
	location.reload();
});

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(y, x) {
	// Set "board" to empty HEIGHT x WIDTH matrix array
	// Two dimensional array to set up the board
	for (let y = 0; y < HEIGHT; y++) {
		board.push(new Array());
		for (let x = 0; x < WIDTH; x++) {
			board[y].push("undefined");
		}
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// Get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById("board");

	// Variable for creating the the table row element
	const top = document.createElement("tr");
	// Set the id to column-top
	top.setAttribute("id", "column-top");
	// Add event listener for a click
	top.addEventListener("click", handleClick);

	// Loop for creating the table data cell elements
	for (let x = 0; x < WIDTH; x++) {
		// Create a variable to make the table data cell elements
		const headCell = document.createElement("td");
		// Adds id
		headCell.setAttribute("id", x);
		// Add to headcell
		top.append(headCell);
	}
	// Add to top
	htmlBoard.append(top);

	//Loop for creating table row element
	for (let y = 0; y < HEIGHT; y++) {
		// Variable for creating table row element
		const row = document.createElement("tr");
		// Loop through and add the table data elements
		for (var x = 0; x < WIDTH; x++) {
			// Variable to create the table data elements
			const cell = document.createElement("td");
			// Set id y-x
			cell.setAttribute("id", `${y}-${x}`);
			// Add to row
			row.append(cell);
		}
		// Add to board
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	for (let y = HEIGHT -1; y >= 0; y--) {
		console.log('1:', y);
		console.log('2: ', board[y][x])
		if (board[y][x] === 'undefined') {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// Make a div and insert into correct table cell
	let gamePieceLocationDiv = document.createElement("div");
	// Add classes to the div
	gamePieceLocationDiv.classList.add(
		"piece",
		"animated",
		"bounceIn",
		`player${currPlayer}`
	);
	//Add div to the html board 
	document.getElementById(`${y}-${x}`).append(gamePieceLocationDiv);
}

/** endGame: announce game end */
// Message function to make an alert
function endGame(msg) {
	alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
			return endGame(`Player ${currPlayer} won!`);
	}

	//check for tie	
	if (checkForTie()) { 
			endGame(`Tie`);
		}

	
	// Check if all cells in board are filled; if so call, call endGame
	function checkForTie(){
		// Loops through the row
		for (let y = 0; y < board.length; y++) {
			// Loops through the column
			for (let x = 0; x < board[y].length; x++) {
				// Checks to see if the row/column value is undefined
				if (board[y][x] === 'undefined'){
					// If you find a false, exit the function, because the game is not a tie, and the game will continue
					return false;
				}
			}		
		}
		// end game, because the game is a tie
		return true;
	}

	// switch players
	if (currPlayer === 1) {
		currPlayer = 2;
	} else {
		currPlayer = 1;
	}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			([y, x]) =>
				y >= 0 &&
				y < HEIGHT &&
				x >= 0 &&
				x < WIDTH &&
				board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.
	// Loops through the Height
	for (let y = 0; y < HEIGHT; y++) {
		// Loops throught the Width
		for (let x = 0; x < WIDTH; x++) {
			// Check for horizontal 4 in a row
			const horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			// Check for vertical 4 in a row
			const vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			// Check for diagonal right 4 in a row
			const diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			// Check for diagonal left 4 in a row
			const diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];
			// If there is four in a row return true
			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
