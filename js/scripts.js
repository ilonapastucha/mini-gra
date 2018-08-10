/*
1 - paper
2 - scissors
3 - rock
*/

"use strict";
(function(){
	
	var computerScore = document.getElementById('computerScore');
	var playerScore = document.getElementById('playerScore');
	var newGamebutton = document.getElementById('newGame');
	var output = document.getElementById('output');
	var paperButton = document.getElementById('paper');
	var rockButton = document.getElementById('rock');
	var scissorsButton = document.getElementById('scissors');
	var rounds= document.getElementById('rounds');
	var roundNumber = 0;
	var enter = function(){
		return '<br><br>';
	};

	var isProperly = function(number) {
		return (isNaN(parseInt(number)) || number === '' || number == null) ? true : false;
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

	var StopGame = function(onOff) {
		if(onOff ==='true'){
			scissorsButton.setAttribute("disabled","disabled");
			paperButton.setAttribute("disabled","disabled");
			rockButton.setAttribute("disabled","disabled");
		} else {
			scissorsButton.removeAttribute("disabled");
			paperButton.removeAttribute("disabled");
			rockButton.removeAttribute("disabled");
		}
	};
	var Game = function(choise){
		var playerChoice = choise;
		var computerChoice = randomChoice();
		var roundResult = compare(playerChoice, computerChoice);
		addScore(roundResult);
		if (playerScore.innerText === roundNumber){
			output.innerHTML = enter() + 'YOU WON THE GAME !'; 
			StopGame('true');
		} else if (computerScore.innerText === roundNumber){
			output.innerHTML = enter() + 'YOU LOSE THE GAME !';
			StopGame('true');
		} else { 
			output.innerHTML = roundResult + ' Computer chose ' + choiceToText(computerChoice) + ' , You chose ' + choiceToText(playerChoice) + enter() + output.innerHTML;
		}
	};
	
	computerScore.innerHTML = '0';
	playerScore.innerHTML = '0';

	newGamebutton.addEventListener('click', function(){
		roundNumber = window.prompt('To what result we play ?');
		if (isProperly(roundNumber)){
			rounds.innerHTML = 'No value added !';
		} else {
			rounds.innerHTML = 'We play to ' + roundNumber + ' victories!';
			output.innerHTML ='';
			computerScore.innerHTML = '0';
			playerScore.innerHTML = '0';
			StopGame('false');
		}
	});

	paperButton.addEventListener('click', function(){
		Game(1);
	});

	rockButton.addEventListener('click', function(){
		Game(3);
	});

	scissorsButton.addEventListener('click', function(){
		Game(2);
	});
})();