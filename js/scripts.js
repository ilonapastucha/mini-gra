"use strict";
(function () {
	var params = {
		computerScore: document.getElementById('computerScore'),
		playerScore: document.getElementById('playerScore'),
		newGamebutton: document.getElementById('newGame'),
		output: document.getElementById('output'),
		paperButton: document.getElementById('paper'),
		rockButton: document.getElementById('rock'),
		scissorsButton: document.getElementById('scissors'),
		rounds: document.getElementById('rounds'),
		gameRound: 1,
		roundNumber: 0,
		computerScoreInt: 0,
		playerScoreInt: 0,
		choices: ['paper', 'scissors', 'rock'],
		tableForScore: [] /* tablica ktora przechowuje obiekty; obiekt= wynik danej rundy */
	};
	
	var enter = function () {
		return '<br><br>';
	};

	var isProperly = function (number) {
		return (isNaN(parseInt(number)) || number === '' || number == null) ? true : false;
	};

	var randomChoice = function () {
		return params.choices[Math.floor(Math.random() * 3)];
	};

	var compare = function (player, computer) {
		if (player === computer) {
			return 'Draw!';
		} else if ((player === 'paper' && computer === 'rock') || (player === 'rock' && computer === 'scissors') || (player === 'scissors' && computer === 'paper')) {
			params.playerScoreInt++;
			params.playerScore.innerHTML = params.playerScoreInt;
			return 'You won!';
		} else {
			params.computerScoreInt++;
			params.computerScore.innerHTML = params.computerScoreInt;
			return 'You lose!';
		}
	};

	var StopGame = function (onOff) {
		if (onOff) {
			scoresTable();
			params.scissorsButton.setAttribute("disabled", "disabled");
			params.paperButton.setAttribute("disabled", "disabled");
			params.rockButton.setAttribute("disabled", "disabled");
		} else {
			params.scissorsButton.removeAttribute("disabled");
			params.paperButton.removeAttribute("disabled");
			params.rockButton.removeAttribute("disabled");
		}
	};

	/*ponizej funkcja generująca html z tabelką z wynikami do modala*/
	var scoresTable = function(){
		params.tableForScore.forEach(function(elem) {
			document.querySelector('#scores tbody').innerHTML += '<td>' + elem.gameRound + '</td><td>' + elem.computerChoice + '</td><td>' + elem.playerChoice + '</td><td>' + elem.roundResult + '</td><td>' + elem.computerScoreInt + ':' + elem.playerScoreInt + '</td>';
		});
		
	}

	/*ponizej funkcja która wykonuje się dla każdej rundy*/
	var Game = function (event) {
		var playerChoice = event.target.id;
		var computerChoice = randomChoice();
		var roundResult = compare(playerChoice, computerChoice);
		/*ponizej stworzenie obiektu z wynikami rundy*/
		var objectForScore = {gameRound: params.gameRound, playerChoice: playerChoice, computerChoice: computerChoice, roundResult: roundResult, computerScoreInt: params.computerScoreInt, playerScoreInt: params.playerScoreInt};
		params.tableForScore.push(objectForScore); /* dodanie obiektu do tablicy po każdej rundzie*/
		params.gameRound++;
		if (params.playerScoreInt === params.roundNumber) {
			document.querySelector('#modal-winners').classList.add('show');
			document.querySelector('#modal-win').classList.add('show');
			document.querySelector('#modal-score').classList.add('show');
			StopGame(true);
		} else if (params.computerScoreInt === params.roundNumber) {
			document.querySelector('#modal-winners').classList.add('show');
			document.querySelector('#modal-loss').classList.add('show');
			document.querySelector('#modal-score').classList.add('show');
			StopGame(true);
		} else {
			params.output.innerHTML = roundResult + ' Computer chose ' + computerChoice + ' , You chose ' + playerChoice + enter() + params.output.innerHTML;
		}
	};

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-winners').classList.remove('show');
		document.querySelector('#modal-win').classList.remove('show');
		document.querySelector('#modal-loss').classList.remove('show');
		document.querySelector('#modal-score').classList.remove('show');
	};

	document.querySelector('#modal-winners').addEventListener('click', hideModal);
	
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
	
	var playerMoves = document.querySelectorAll('.player-move');

	for (var i = 0; i < playerMoves.length; i++) {
		playerMoves[i].addEventListener('click', Game);
	};

	params.computerScore.innerHTML = '0';
	params.playerScore.innerHTML = '0';

	params.newGamebutton.addEventListener('click', function () {
		params.roundNumber = window.prompt('To what result we play ?');
		if (isProperly(params.roundNumber)) {
			params.rounds.innerHTML = 'No value added !';
		} else {
			params.roundNumber = parseInt(params.roundNumber);
			params.rounds.innerHTML = 'We play to ' + params.roundNumber + ' victories!';
			params.output.innerHTML = '';
			params.computerScore.innerHTML = '0';
			params.playerScore.innerHTML = '0';
			params.computerScoreInt = 0;
			params.playerScoreInt = 0;
			params.gameRound = 1;
			params.tableForScore = [];
			StopGame(false);
			document.querySelector('#scores tbody').innerHTML = '';
		}
	});

})();