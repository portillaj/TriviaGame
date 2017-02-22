$(document).ready(function(){

	//create a interval for 20 seconds for each question
	//create an object for each question and gif
	var quiz = [
			{
				question: "What war was fought on American soil from 1861 to 1865?",
				answers: ["War of 1812", 
						 "World War I", 
						 "The Revolutionary War", 
						 "The American Civil War"], //answer
				gifPath: "assets/images/glory.gif",
				answer: 3
			},
			{
				question: "What do the Somalis refer to the Battle of Mogadishu as?",
				answers: ["Day Of Reckoning", 
					 	 "The Day of the Rangers", //answer
					 	 "Locomotive of History", 
					 	 "The Day of Blood"],
				gifPath: "assets/images/black-hawk-down.gif",
				answer: 1
			},
			{
				question: "What is the name of U.S. battleship that accounted for almost half the casualties at Pearl Harbor?",
				answers: ["USS Nevada", 
						 "USS Missouri", 
						 "USS Arizona", //answer
						 "USS Oklahoma"],
				gifPath: "assets/images/pearl-harbor.gif",
				answer: 2
			},
			{
				question: "The Emancipation Proclamation issued by Lincoln stated that:",
				answers: ["Slaves were free in areas of the Confederate states not held by the Union", //answer
						 "The slave trade was illegal", 
						 "Slaves who fled to Canada would be protected", 
						 "Slavery was abolished in the Union"],
				gifPath: "assets/images/lincoln.gif",
				answer: 0
			},
			{
				question: "Who was Chris Kyle:",
				answers: ["He was a Navy Seal sniper", //answer
						 "He was A Marine", 
						 "He was A Green Beret", 
						 "He was A Army Ranger"],
				gifPath: "assets/images/american-sniper.gif",
				answer: 0
			},
			{
				question: "What was the last major attempt at a peaceful resolution with Germany prior to the outbreak of WWII?",
				answers: ["The Munich Conference", //answer
						 "The 1936 Olympic Conferences", 
						 "The Washington Naval Conference", 
						 "The Geneva Convention"],
				gifPath: "assets/images/american-sniper.gif",
				answer: 0
			},
			{
				question: "The Allied landing forces consisted mostly of soldiers from which three nations?",
				answers: ["The United States, Britain, and Canada", //answer
						 "The United States, Britain, and Poland", 
						 "The United States, Canada, and Australia", 
						 "The United States, Britain, and Australia"],
				gifPath: "assets/images/saving-ryan.gif",
				answer: 1
			},
			{
				question: "What was the largest active force the Continental Army ever had at one time?",
				answers: ["150,000 Troops", //answer
						 "85,000 Troops", 
						 "24,000 Troops", 
						 "175,000 Troops"],
				gifPath: "assets/images/patriot.gif",
				answer: 2
			},
			{
				question: "The Vietnam War was the first war of the 20th century?",
				answers: ["that showed how strong Communism was", //answer
						 "that the Americans had lost", 
						 "in which so many civilians were killed"],
				gifPath: "assets/images/platoon.gif",
				answer: 1
			}



	];

	//variable used throughout the game
	var intervalId;
	var timer = 16;
	var count = 0;
	var myQuestions = $(".question-font");
	var message = $(".time-up");
	var gifImage = $("#my-gif");
	var restart = $(".restart");
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;

	//hide restart button
	restart.hide();
	//start the game
	startGame();

	//create a start function to start the game 
	function startGame() {
		$(".start-button").on("click", function() {
			restart.hide();
			$(this).hide();
			quizQuestions();
		});
	}

	//function that displays the question and answers
	function quizQuestions(){
		if(count === quiz.length){ //if quiz is over display the results
			stop();
			$(".question-font").empty();
			gifImage.hide();
			restart.show();
			results();
			resetGame();
			
		}else{ //if quiz is not over, continue with questions
			gifImage.hide();
			intervalId = setInterval(decrement, 1000);
			resetTimer();
			message.html("");
			myQuestions.html(quiz[count].question);
			for (var j = 0; j < quiz[count].answers.length; j++) {
				var choiceElement = $("<li>" + quiz[count].answers[j] + "</li>").attr("data-index", j);
				$(".myAnswers").append(choiceElement);
			}//end inner for loop
			checkAnswer();
		}
	}//end function

	//function that decreases the timer
	 function decrement() {
      //  Decrease number by one.
      timer--;
      //  Show the number in the #show-number tag.
      $("#count").html("<h2>" + timer + "</h2>");
      //  Once number hits zero...
      if(timer === 0) {
        stop();
        unanswered++;
        message.html("<h2>Sorry! Your Time ran out");
		gifDisplay();
      }//end if 
    }//end function

	//create a stop function to stop the timer
	function stop() {
		clearInterval(intervalId);
	}

	//create a function to check if answer is correct and display gif 
	function checkAnswer() {
		$("#answers li").on("click", function(){
			if($(this).data("index") === quiz[count].answer){
				stop();
				correct++;
				message.html("<h2>Nice! You got it right");
				gifDisplay();
			}else {
				stop();
				wrong++;
				message.html("<h2>Sorry! You got it wrong");
				gifDisplay();
			}
		});//end click function
	}//end checkAnswerfunction

//function that resets the timer
function resetTimer(){
	timer = 15;
	decrement();
}//end function

//function that resets the game
function resetGame() {
	$(".restart").on("click", function() {
			message.empty();
			$(".myAnswers").empty();
			count = 0;
			correct = 0;
			wrong = 0;
			unanswered = 0;
		quizQuestions();
	});
}//end function

//function that displays gif and goes to the next question
function gifDisplay(){
	gifImage.html("<img src=" + quiz[count].gifPath + ">").addClass("gif-resize").show();
	$(".myAnswers").empty();
	count++;
	setTimeout(quizQuestions, 5000);
	console.log("count: " + count);
}//end function

//function that displays results when the game ends
function results(){
	message.html("<h1>All done!, Here is how you scored: ");
	message.append("<h2>You got " + correct + " questions right");
	message.append("<h2>You got " + wrong + " questions wrong");
	message.append("<h2>You unanswered " + unanswered + " questions");
	message.append(restart);
}

});//end ready function