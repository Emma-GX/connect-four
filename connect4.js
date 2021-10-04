/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(y, x) {
	// Set "board" to empty HEIGHT x WIDTH matrix array
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
	// TODO: write the real version of this, rather than always returning 0
	return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// Make a div and insert into correct table cell
	const gamePieceLocationDiv = document.createElement("div");
	gamePieceLocationDiv.classList.add(
		"piece",
		"animated",
		"bounceIn",
		`player${currPlayer}`
	);

	document.getElementById(`${y}-${x}`).append(gamePieceLocationDiv);
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	var x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	function checkForTie(array) {
		return array !== undefined
	}
	 if(board.every(checkForTie)) {
		return endGame('Tie Game!');
	 }

	
	// TODO: check if all cells in board are filled; if so call, call endGame
	// let tableLocations = document.getElementsByTagName('td').value;
	// if (tableLocations !== undefined) {
	//   endGame('Tied Game!');
	// }

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

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			const vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			const diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			const diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
