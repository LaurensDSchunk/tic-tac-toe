const boardElement = document.getElementById("gameBoard");
let board = [
	['','',''],
	['','',''],
	['','','']
];


boardElement.addEventListener("click", function(table) {
	let x = table.target.cellIndex;
  let y = table.target.parentElement.rowIndex;
	if (isWin() != false) {
		board = [
			['','',''],
			['','',''],
			['','','']
		];
		document.getElementById("mainText").innerText = "Tic Tac Toe";
		document.getElementById("secondaryText").innerText = "If you don't know, the goal is to get three in a row";

	}
	if (board[y][x] == '' && isWin() == false) {
		board[y][x] = 'X';
		computerMove();
	}
	switch (isWin()) {
		case true:
			document.getElementById("mainText").innerText = "Its a tie!";
			break;
		case 'X':
			document.getElementById("mainText").innerText = "You win!";
			break;
		case 'O':
			document.getElementById("mainText").innerText = "The computer wins!"
			break;
	}
	if (isWin() != false) {
		document.getElementById("secondaryText").innerText = "Click the board to play again!";
	}
	updateBoard();
});

function isWin() {
	/*
		X wins: 'X'
		O wins: 'O'
		Draw  : true
		None  : false
	*/
	for (let i = 0; i <= 2; i++) {
		if (board[i][0] != '' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
			return board[i][0];
		}
		if (board[0][i] != '' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
			return board[0][i]
		}
	}
	if (board[1][1] != '' && (board[0][0] == board[1][1] && board[1][1] == board[2][2]) || (board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
		return board[1][1];
	}
	let hasBlank = false;
	for (let x = 0; x <= 2; x++) {
		for (let y = 0; y <= 2; y++) {
			if (board[y][x] == '') {
				hasBlank = true;
			}
		}
	}
	if (hasBlank == false) {
		return true;
	}
	return false;
}
function updateBoard() {
	for (let i = 0; i <= 2; i++) {
		for (let j = 0; j <= 2; j++) {
			boardElement.rows[j].cells[i].innerText = board[j][i];
		}
	}
}
function computerMove() {
	if (isWin() == false) {
		let move = [,];
		let score = 0;
		let bestScore = -2;
		for (let x = 0; x <= 2; x++) {
			for (let y = 0; y <= 2; y++) {
				if (board[y][x] == '') {
					board[y][x] = 'O';
					score = minimax(false);
					board[y][x] = '';
					if (score > bestScore) {
						bestScore = score;
						move = [x,y];
					}
				}
			}
		}
		board[move[1]][move[0]] = 'O';
	}
}
function minimax(maximizing) {
	switch (isWin()) {
		case false:
			let score = 0;
			let bestScore;
			if (maximizing) {
				bestScore = -2;
			}
			if (!maximizing) {
				bestScore = 2;
			}
			for (let x = 0; x <= 2; x++) {
				for (let y = 0; y <= 2; y++) {
					if (board[y][x] == '') {
						if (maximizing) {
							board[y][x] = 'O';
							score = minimax(false);
							board[y][x] = '';
							if (score > bestScore) {
								bestScore = score;
							}
						}
						if (!maximizing) {
							board[y][x] = 'X';
							score = minimax(true);
							board[y][x] = '';
							if (score < bestScore) {
								bestScore = score;
							}
						}
					}
				}
			}
			return bestScore;
			break;
		case 'X':
			return -1;
			break;
		case 'O':
			return 1;
			break;
		case true:
			return 0;
			break;
	}
}


