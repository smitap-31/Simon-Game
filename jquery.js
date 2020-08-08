var gamePattern=[];
var userClickedPattern=[];
var flag=0;
var level=0;

var buttonColours=["red","blue","green","yellow"];

	$(".btn").click(function() {
	  var userChosenColour = $(this).attr("id");
	  userClickedPattern.push(userChosenColour);
	  playSound(userChosenColour);
	  animatePress(userChosenColour);
	  checkAnswer(userClickedPattern.length-1);
	  // nextSequence();
	});



	$( document ).keydown(function() {
		if(flag==0)
        {
        	flag=1;
        	// alert('hi');
        	nextSequence();
        }
   });


function nextSequence(){
	userClickedPattern=[];
	$('h1').text("Level "+level);
	++level;
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColor=buttonColours[randomNumber];
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	gamePattern.push(randomChosenColor);
}


function playSound(name)
{
	var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
	  $("#"+currentColor).addClass('pressed');
	 setTimeout(function(){
            $("#"+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
	    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
             console.log("success");

      if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $('body').addClass('game-over');
      setTimeout(function(){
      	$('body').removeClass('game-over');
      },200);

      $('h1').text("Game Over, Press Any Key to Restart");
      startOver();

    }
}

function startOver(){
	level=0;
	flag=0;
	gamePattern=[];
}