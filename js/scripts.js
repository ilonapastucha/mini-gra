"use strict";
(function(){
	
	var computerScore = document.getElementById('computerScore');
	var playerScore = document.getElementById('playerScore');
	var newGamebutton = document.getElementById('newGame');
	var output = document.getElementById('output');
	var paperButton = document.getElementById('paper');
	var rockButton = document.getElementById('rock');
	var scissorsButton = document.getElementById('scissors');

	var enter = function(){
		return '<br><br>';
	};

	var randomChoice = function() {
		return Math.floor(Math.random() * 3) + 1;
	};

	var compare = function(player, computer) {
		if (player === computer) {
			return 'Draw!';
		} else if (player - computer == 1 || player - computer == -2) {
			return 'You won!';
		} else {
			return 'You lose!';
		}
	};

	var choiceToText = function(int) {
		if (int == 1){
			return 'paper';
		} else if (int == 2) {
			return 'scissors';
		} else {
			return 'rock';
		}
	};

	var addScore = function(result) {
		if (result === 'You won!') {
			playerScore.innerHTML = parseInt(playerScore.innerText) + 1;
		} else if (result === 'You lose!'){
			computerScore.innerHTML = parseInt(computerScore.innerText) + 1;
		}
	};

	computerScore.innerHTML = '0';
	playerScore.innerHTML = '0';

	newGamebutton.addEventListener('click', function(){
		output.innerHTML ='';
		computerScore.innerHTML = '0';
		playerScore.innerHTML = '0';
	});

	paperButton.addEventListener('click', function(){
		var playerChoice = 1;
		var computerChoice = randomChoice();
		var roundResult = compare(playerChoice, computerChoice);
		output.innerHTML = roundResult + ' Computer chose ' + choiceToText(computerChoice) + ' , You chose ' + choiceToText(playerChoice) + enter() + output.innerHTML;
		addScore(roundResult);
	});

	rockButton.addEventListener('click', function(){
		var playerChoice = 3;
		var computerChoice = randomChoice();
		var roundResult = compare(playerChoice, computerChoice);
		output.innerHTML = roundResult + ' Computer chose ' + choiceToText(computerChoice) + ' , You chose ' + choiceToText(playerChoice) + enter() + output.innerHTML;
		addScore(roundResult);
	});

	scissorsButton.addEventListener('click', function(){
		var playerChoice = 2;
		var computerChoice = randomChoice();
		var roundResult = compare(playerChoice, computerChoice);
		output.innerHTML = roundResult + ' Computer chose ' + choiceToText(computerChoice) + ' , You chose ' + choiceToText(playerChoice) + enter() + output.innerHTML;
		addScore(roundResult);
	});
})();