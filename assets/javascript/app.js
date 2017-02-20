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
				answer: "The American Civil War"
			},
			{
				question: "What do the Somalis refer to the Battle of Mogadishu as?",
				answers: ["Day Of Reckoning", 
					 	 "The Day of the Rangers", //answer
					 	 "Locomotive of History", 
					 	 "The Day of Blood"],
				gifPath: "assets/images/black-hawk-down.gif",
				answer: "The Day of the Rangers"
			},
			{
				question: "What is the name of U.S. battleship that accounted for almost half the casualties at Pearl Harbor?",
				answers: ["USS Nevada", 
						 "USS Missouri", 
						 "USS Arizona", //answer
						 "USS Oklahoma"],
				gifPath: "assets/images/pearl-harbor.gif",
				answer: "USS Arizona"
			},
			{
				question: "The Emancipation Proclamation issued by Lincoln stated that:",
				answers: ["Slaves were free in areas of the Confederate states not held by the Union", //answer
						 "The slave trade was illegal", 
						 "Slaves who fled to Canada would be protected", 
						 "Slavery was abolished in the Union"],
				gifPath: "assets/images/lincoln.gif",
				answer: "Slaves were free in areas of the Confederate states not held by the Union"
			}
	];

	console.log(quiz.length);
	console.log(quiz[0]);
	console.log(quiz[0].answer);

	var interalId;
	var timer = 15;
	var count = 0;
	var message = $(".time-up");
	var gifImage = $("#my-gif");
	var restart = $(".restart");
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;

	restart.hide();

	startGame();


	//create a start function to start the game 
	function startGame() {
		$(".start-button").on("click", function() {
			restart.hide();
			$(this).hide();
			quizQuestions();
		});
	}

	function quizQuestions(){
		if(count === quiz.length){
			stop();
			
			$(".question-font").empty();
			gifImage.hide();
			restart.show();
			message.html("<h1>All done!, Here is how you scored: ");
			message.append("<h2>You got " + correct + " questions right");
			message.append("<h2>You got " + wrong + " questions wrong");
			message.append("<h2>You unanswered " + unanswered + " questions");
			message.append(restart);
			resetGame();
			
		}else{
			gifImage.hide();
			intervalId = setInterval(decrement, 1000);
			resetTimer();
			message.html("");
			var myQuestions = $(".question-font");
			myQuestions.html(quiz[count].question);
			for (var j = 0; j < quiz[count].answers.length; j++) {
				$(".myAnswers").append("<li>" + quiz[count].answers[j] + "</li>");
			}//end inner for loop
			checkAnswer();
		}
	}//end function

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
		message.append("<h3>The correct answer was: " + quiz[count].answer);
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
			if($(this).text() === quiz[count].answer){
				stop();
				correct++;
				message.html("<h2>Nice! You got it right");
				gifDisplay();
			}else {
				stop();
				wrong++;
				message.html("<h2>Sorry! You got it wrong");
				message.append("<h3>The correct answer was: " + quiz[count].answer);
				gifDisplay();
			}
		});//end click function
	}//end checkAnswerfunction

function resetTimer(){
	timer = 15;
	decrement();
}

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
}

function gifDisplay(){
	gifImage.html("<img src=" + quiz[count].gifPath + ">").addClass("gif-resize").show();
	$(".myAnswers").empty();
	count++;
	setTimeout(quizQuestions, 5000);
	console.log("count: " + count);
	
}


});