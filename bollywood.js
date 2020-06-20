function random(){return Math.floor(Math.random()*(data.length))};
var reset = document.querySelector('#reset');
var message = document.querySelector("#message");
var tries = document.querySelectorAll(".try");
var attempt = document.querySelectorAll(".attempt");
var input = document.querySelectorAll(".input")
var actor = document.querySelector(".actor");
var actress = document.querySelector(".actress");
var song = document.querySelector(".song");
var submit = document.querySelectorAll(".submit");
var moviesubmit = document.querySelector(".moviesubmit");
var p = document.querySelector("#bollywood");
var hint = document.querySelectorAll(".hint");
var correctanswer;
var randomnum;
function init(){
	setup();
	restart();
}

function setup(){
			for(var i=0;i<4;i++){
		tries[i].addEventListener("click" , function(){
			
			this.style.opacity = 0;
				for(var i=0;i<4;i++){
				attempt[i].style.display = 'none';
				tries[i].classList.remove(".nopointer")
			}
			this.classList.add(".nopointer")

			attempt[this.name].style.display = 'block';
			attempt[this.name].style.transition =' 2s';
			hint[this.name].style.opacity = 0.3;


		})
	}


moviesubmit.addEventListener("click" , function(e){
	e.preventDefault();
	if(input[2].value.toLowerCase() === correctanswer[2]){
		message.textContent = "Get Ready For Next Movie";
		input[2].value = "";
		setTimeout(function(){restart();
			message.textContent = "WELCOME AGAIN";

		},2000);
		

	}else{
		input[2].value = "";
		if(p.textContent.length===1){
					alert("YOU LOST\nAND THE CORRECT ANSWERS WERE\n" + correctanswer[0].toUpperCase() + "\n" + correctanswer[1].toUpperCase() + "\n" + correctanswer[2].toUpperCase() + "\n" + correctanswer[3].toUpperCase() + "\n")

				}
		p.textContent = p.textContent.slice(1);
		message.textContent = "try again";
	}

})


for(var i=0;i<4;i++){
	if(i===2){continue;}
		submit[i].addEventListener("click" , function(e){	
		e.preventDefault();
			if(input[this.name].value.toLowerCase() === correctanswer[this.name]){
					message.textContent = "Wow You Got That Right";
					hint[this.name].textContent = correctanswer[this.name];
					hint[this.name].style.fontSize = "40px";
				}
			else{
				input[this.name].value = "";
				if(p.textContent.length===1){
					alert("YOU LOST\nAND THE CORRECT ANSWERS WERE\n" + correctanswer[0].toUpperCase() + "\n" + correctanswer[1].toUpperCase() + "\n" + correctanswer[2].toUpperCase() + "\n" + correctanswer[3].toUpperCase() + "\n")
				}
				p.textContent = p.textContent.slice(1);
				message.textContent = "try again";
	}

		})
}	
}

function restart(){
	randomnum = random();
	console.log(randomnum);
	correctanswer = data[randomnum];
	console.log(correctanswer);
	hint[0].textContent = correctanswer[0].slice(0,1).toUpperCase();
	hint[1].textContent = correctanswer[1].slice(0,1).toUpperCase();
	hint[2].textContent = correctanswer[2].slice(0,1).toUpperCase();
	hint[3].textContent = correctanswer[3].slice(0,1).toUpperCase();
	p.textContent = "BOLLYWOOD";
	for(var i=0;i<4;i++){
		hint[i].style.fontSize = "100px";
		hint[i].style.opacity = 1;
	}
	
}
reset.addEventListener("click" , function(e){
	
	restart();
});
init();

