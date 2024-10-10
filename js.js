window.onload = function(){
    var simonSequence = [];//creates a array to store the random sequnce of cirlces selected
    var circle = Array.from(document.querySelectorAll('.circle')); //Array to hold all of the circle values
    var startButton = document.querySelector(".button");//calls the start button class in a new variable
    var gamestatus = document.querySelector('.gamestatus'); //variable for the small circle below start button
    var currentScore = document.querySelector('.currentscore'); //variable for the current score
    var highScore = document.querySelector('.highscore'); //variable for the highest
    var counter = 0; //creates a counter for the current sequence of the game
    var currentRound = 0;
    
    startButton.addEventListener('click', function() //calls the function to start the game
    {
        startButton.disabled = true;
        gamestatus.style.backgroundColor = 'green'; //sets the small light to green indicating the game has started

        var randomSimon = Math.floor(Math.random() * circle.length) //pickes a random circle from the four colours
        simonSequence.push(circle[randomSimon]); //appends the random circle to the array
        for(let i = 0; i < simonSequence.length; i++)
        {
            setTimeout(function(){
                flashCircle(simonSequence[i]); //flashes the circles in the random order every second
            }, i * 1000)
        }
    });

    function flashCircle(flash)
    {
        var oldcolor = flash.style.backgroundColor;
        flash.style.backgroundColor = 'white'; //flashes the circle white when randomly selected

        setTimeout(function(){ //reverts to the circles original color after a second
            flash.style.backgroundColor = oldcolor;
        }, 1000);
    }

    circle.forEach(function(currentCircle, i)
    {
        currentCircle.addEventListener('click', function(){
            if(simonSequence[counter] === currentCircle)
            {
                counter++;
                if(counter === simonSequence.length){
                    currentScore.value++; //increase the score count
                    counter = 0;
                    currentRound++; // moves onto the next round
                    //moves on to the next sequence
                    startButton.disabled = false;
                    startButton.click(); //manually clicks the start button to move on to the next sequence
                    startButton.disabled = true;
                }
            }
            else
            {
                if(currentScore.value > highScore.value)
                {
                    //sets a new highscore and resets the game
                    highScore.value = currentScore.value;
                    currentScore.value = 0;
                    simonSequence = [];
                    counter = 0;
                    round = 0;
                    gamestatus.style.backgroundColor = 'red';
                    startButton.disabled = false;
                }
            }
        });
    });
}