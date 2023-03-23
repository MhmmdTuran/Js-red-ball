var ball = document.getElementById("ball");
var game = document.getElementById("game");
var interval;
var sag=0;
var sol=0;
var saginterval;
var solinterval;
var both = 0;
var counter =0;
var blockSpeed =0.5;
var ballSpeed = 3;
var currentBlocks =[];
document.getElementById("TryAgainButton").style.visibility="hidden";
document.getElementById("scoreText").style.visibility="hidden";
document.getElementById("highScore").style.visibility="hidden";


function moveRight(){
    var left=
    parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if (left<1352) {
        ball.style.left = left + ballSpeed + "px";
    }
};


function moveLeft(){
    var left = 
    parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left>0)
    {
        ball.style.left = left - ballSpeed + "px";
    }
};



document.addEventListener("keydown",event =>{

if(sag==0 || sol==0){
    ballSpeed*=1.005;

    if(sol==0 && event.key==="ArrowLeft"){
        
            solinterval = setInterval(moveLeft,1);
            sol++;
          
    }
    
    
    if(sag==0 && event.key==="ArrowRight"){
        
            saginterval = setInterval(moveRight,1);
            sag++;
        
    }
}
});


document.addEventListener("keyup",event =>{
    
    if(event.key==="ArrowRight"){
    clearInterval(saginterval);
    sag=0;
    }

    if(event.key==="ArrowLeft"){
    clearInterval(solinterval);
    sol=0;
    }
    
})



const score = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if (counter>0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if (blockLastTop<700 || counter ==0) {
    var block = document.createElement("div");
    var hole = document.createElement("div");
    block.setAttribute("class","block");
    hole.setAttribute("class","hole");
    block.setAttribute("id","block"+counter);
    hole.setAttribute("id","hole"+counter);
    block.style.top = blockLastTop + 75 + "px";
    hole.style.top = holeLastTop + 75 + "px";
    var random = Math.floor(Math.random() * 1175);
    hole.style.left = random + "px";
    
    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(counter);
    counter++;
    blockSpeed += 0.01;
    }

    
   
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var drop=0;

        if(ballTop <= 0 ){
            clearInterval(score);
              
            document.getElementById("highScore").innerHTML = "High Score : " +localStorage.highScore;
                
            
            document.getElementById("ball").style.visibility="hidden";
            document.getElementById("scoreText").innerHTML="Your Score : " + (counter-16) ;
            document.getElementById("scoreText").style.visibility="visible";
            document.getElementById("TryAgainButton").style.visibility="visible";
            document.getElementById("highScore").style.visibility="visible";

            if(parseInt( localStorage.highScore) < (counter-16)) 
                {localStorage.highScore = counter-16 }
            
            
        } 
        
    for (var index = 0; index < currentBlocks.length ; index++) {

            let current = currentBlocks[index];
            let iblock = document.getElementById("block"+current);
            let ihole = document.getElementById("hole"+current);
            let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
            let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
            iblock.style.top = iblockTop - blockSpeed + "px";
            ihole.style.top = iblockTop - blockSpeed + "px";
            if (iblockTop < -20 ) {
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
                
            }

            if(iblockTop-28<ballTop && iblockTop > ballTop)
            {
                drop++;
                if(iholeLeft <= ballLeft && iholeLeft + 175 > ballLeft)
                {
                    drop = 0;
                }
            }

    }

    if (drop ==0) {
        if(ballTop < 610){
        ball.style.top = ballTop + ballSpeed + "px";
        }
    }
    else{
        ball.style.top = ballTop - blockSpeed +"px";
    }
    
},1);

