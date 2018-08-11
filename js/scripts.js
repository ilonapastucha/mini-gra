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
	var computerScoreInt = 0;
	var playerScoreInt = 0;
	var enter = function(){
		return '<br><br>';
	};

	var isProperly = function(number) {
		return (isNaN(parseInt(number)) || number === '' || number == null) ? true : false;
	};

	var randomChoice = function() {
		return Math.floor(Math.random() * 3) + 1;
	};

	var choiceToText = function(int) {
		if (int == 1){
			return 'paper';
		} else if (int == 2) {
			return 'scissors';
		} else { /*3*/
			return 'rock'; 
		}
	};
	var choiceToInt = function(txt) {
		if (txt === 'paper'){
			return 1;
		} else if (txt === 'scissors') {
			return 2;
		} else { /*rock*/
			return 3; 
		}
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

	var addScore = function(result) {
		if (result === 'You won!') {
			playerScoreInt++;
			playerScore.innerHTML = playerScoreInt;
		} else if (result === 'You lose!'){
			computerScoreInt++;
			computerScore.innerHTML = computerScoreInt;
		}
	};

	var StopGame = function(onOff) {
		if(onOff ===true){
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
		if (playerScoreInt === roundNumber){
			output.innerHTML = enter() + 'YOU WON THE GAME !'; 
			StopGame(true);
		} else if (computerScoreInt === roundNumber){
			output.innerHTML = enter() + 'YOU LOSE THE GAME !';
			StopGame(true);
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
			roundNumber = parseInt(roundNumber);
			rounds.innerHTML = 'We play to ' + roundNumber + ' victories!';
			output.innerHTML ='';
			computerScore.innerHTML = '0';
			playerScore.innerHTML = '0';
			computerScoreInt = 0;
			playerScoreInt = 0;
			StopGame(false);
		}
	});

	paperButton.addEventListener('click', function(){
		Game(choiceToInt('paper'));
	});

	rockButton.addEventListener('click', function(){
		Game(choiceToInt('rock'));
	});

	scissorsButton.addEventListener('click', function(){
		Game(choiceToInt('scissors'));
	});
})();