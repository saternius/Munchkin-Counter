// ----------------------------------------
// Actual game code goes here.

// 
//Global 
//vars


fps = null;
canvas = null;
ctx = null;


// ----------------------------------------

// Our 'game' variables


//var person= prompt("Please enter your name",20);
var minutes = prompt("How much minutes?",20);;
var messages="NOTHING";
var timeDisp = minutes+":00";
var level = 1;
var strength =1;
var timer = 10;
var seconds = minutes*60;
var loose = false;
var countdown = false;

var imageObj = new Image();
imageObj.src = 'background.png';







window.onload = function () {
    
	canvas = document.getElementById("screen");
    
	ctx = canvas.getContext("2d");
   
	 fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
	

canvas.addEventListener('click', function(evt) {
  
	      var mousePos = getMousePos(canvas, evt);
       
	      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
              mouseX = mousePos.x;
              mouseY= mousePos.y;
			  if(mouseY<85){
				countdown=!countdown;
			  }
			  if(mouseX<80){
					if(mouseY>175 && mouseY<250){
						level--;
					}
					if(mouseY>340 && mouseY<405){
						strength--;
					}
			  }
			  if(mouseX>250){
				   if(mouseY>175 && mouseY<250){
						level++;
					}
					if(mouseY>340 && mouseY<405){
						strength++;
					}
			  }
			  if(level<1){
					level=1;
			  }
			  if(level>10){
					level=10;
			  }
   
	   }, false);
	   

GameLoopManager.run(GameTick);

};








function GameTick(elapsed)
{
	fps.update(elapsed);

	//clock functionality
	if(countdown){
	timer--;
	}
	if(timer<0){
		timer=fps.FramesPerSec;
		if(!loose){
		seconds--;
		if(seconds%60==59){
		   minutes--;
		}
		if(seconds%60<=9){
			timeDisp= minutes+":0"+seconds%60;
		}else{
			timeDisp= minutes+":"+seconds%60;
		}
		if(minutes==0 && seconds == 0){
			loose= true;
		}
		}else{
			timeDisp= "Loser";
		}
	}
	
	
	ctx.fillStyle = "#6699CC";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//level++;
	//strength++;
	ctx.drawImage(imageObj, 0, 0);
	
	ctx.fillStyle = "#CACE11";
	if(countdown){
	ctx.fillRect(8, 6, 309, 65);
	}
	
	ctx.fillStyle = "#1D3A60";
	ctx.font = '35pt Lucida Console';
	var shift = timeDisp.length*16;
	ctx.fillText(timeDisp,172-shift,55);
	
	ctx.font = 'bold 35pt Calibri';
	
	if(level<10){
		ctx.fillText(level, 155 , 225);
	}else{
		ctx.fillText("Winner",92,225);
	}
	
	if(strength<10){
		ctx.fillText(strength,155, 390);
	}else{
		ctx.fillText(strength,138, 390);
	}
}


function getMousePos(canvas, evt) {
       
 var rect = canvas.getBoundingClientRect();
       
 return {
         
	 x: evt.clientX - rect.left,
       
         y: evt.clientY - rect.top
       
 };
     
 }