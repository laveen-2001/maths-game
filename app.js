var score;
var playing = false;
var timeremaining;
var countdown;
var correctAns;

/*HELPER*/
function setText(id,text){
    document.getElementById(id).innerHTML = text ;
}
function show(id){
    document.getElementById(id).style.display = 'block';
}
function hide(id){
    document.getElementById(id).style.display = 'none';
}

document.getElementById('startreset').onclick=function(){
    if(playing==true){
        //game is on and you tried to reset it!
        playing=false;
        window.location.reload();
    }else{
        //game is off and you want to start it!
        playing=true;
        
        score=0;
        setText("scoreValue",score);
        
        show("timeremaining");
        timeremaining=25;
        setText("timeremainingValue",timeremaining);
        
        this.innerHTML="Reset Game";
        hide("gameover");
        startCountdown();
        generateQA();
    }
}

function startCountdown(){
    countdown=setInterval(function(){
        timeremaining -=1;
        setText("timeremainingValue",timeremaining);
        if(timeremaining<=0){
            stopCountdown();
            show("gameover");
            playing=false;
            setText("startreset","Start Game!");
            hide("timeremaining");
            setText("scoreValue","");
            setText("gameover","<p>Game Over!</p><p>Your Score is " +score+"</p>")
        }
    },1000);
}

function stopCountdown(){
    clearInterval(countdown);
}

function generateQA(){
    
    var x = (1+Math.round(Math.random()*9));
    var y = (1+Math.round(Math.random()*9));
    var op = (1+Math.round(Math.random()*3));
    
    switch(op){
        case 1: correctAns=x*y;
                setText("question",x+"x"+y);break;
        case 2: correctAns=x+y;
                setText("question",x+"+"+y);break;
        case 3: correctAns=x-y;
                setText("question",x+"-"+y);break;
        case 4: correctAns=(x/y).toFixed(4);
                setText("question",x+"/"+y);break;
    }
    var correctPosition = (1+Math.round(Math.random()*3));
    setText("box"+correctPosition,correctAns);
    
    var answers=[correctAns];
    for(i=1;i<5;i++){
        var wrongAns;
        if(i!=correctPosition){
            
            do{
                switch(op){
                    case 1 : wrongAns=(1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));break; 
                    case 2 : wrongAns=(1+Math.round(Math.random()*9))+(1+Math.round(Math.random()*9));break; 
                    case 3 : wrongAns=(1+Math.round(Math.random()*9))-(1+Math.round(Math.random()*9));break; 
                    case 4 : wrongAns=((1+Math.round(Math.random()*9))/(1+Math.round(Math.random()*9))).toFixed(4);break; 
                }
            }while(answers.indexOf(wrongAns)>-1);
            
            answers.push(wrongAns);
            setText("box"+i,wrongAns);
        }
    }
}

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        if(playing){
            if(correctAns == this.innerHTML){
                score++;
                setText("scoreValue",score);
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                },1000);
                
                generateQA();
            }else{
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}












