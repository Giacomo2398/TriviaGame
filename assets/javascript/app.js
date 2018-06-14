$(document).ready(function() {
    var counter = 15;
    var questions = ["The Condorde was a supersonic passenger airliner flown by which two airlines?", "In the board game Monopoly, how much does it cost to buy a railroad?","When a drink is served 'on the rocks,' it is served with what?","Quito is the capital city of which South American country?","Mario Kart is a video game series publish by which company?","What ingredient is added to white sugar to make brown sugar?", "What is the heaviest naturally occurring element found on Earth?", "Which book holds the record of being the most stolen book from public libraries?", "What is the name for the branch of mathematics dealing with lengths and angles of triangles?","Jack the RIpper is the name given to an unidentified serial killer that terrorized what city in 1888?"];
    var answers = [["Air France & Lufthansa","American Airlines & British Airways", "Air France & British Airways", "Qatar Airways & Singapore Airlines"],["$200","$150","$100","$125"], ["A lime & salt on the rim","Orange juice","Tonic water","Ice cubes"],["Peru","Bolivia","Ecuador","Venezuela"],["Microsoft","Sony","Bethesda","Nintendo"],["Molasses","Splenda","Maltose","Lactose"], ["Lead","Plutonium","Magnesium","Uranium"], ["Guinnes Book of World Records","The Bible","English dictionary", "The Great-Gatsby"],["Geometry","Trigonometry","Algebra","Calculus"],["Amsterdam","Barcelona","London","Berlin"]];
    var img = [["<img class='img' src='assets/images/concorde.jpg'>"],["<img class='img' src='assets/images/railroad.jpg'>"],["<img class='img' src='assets/images/ice.jpg'>"],["<img class='img' src='assets/images/Quito.jpg'>"],["<img class='img' src='assets/images/Nintendo.png'>"],["<img class='img' src='assets/images/Brown.jpg'>"],["<img class='img' src='assets/images/uranium.jpg'>"],["<img class='img' src='assets/images/Guinnes.jpg'>"],["<img class='img' src='assets/images/Trigonometry.png'>"],["<img class='img' src='assets/images/Jack.jpg'>"]];
    var correctAnswers = ["C. Air France & British Airways","A. $200","D. Ice cubes","C. Ecuador","D. Nintendo","A. Molasses","D. Uranium","A. Guinnes Book of World Records","B. Trigonometry","C. London"];
    var questionCounter = 0;
    var selectedAnswer;
    var Clock;
    var correctquestions = 0;
    var incorrectquestions = 0;
    var unansweredquestions = 0;

    $("body").on("click","#start", function(event){
        generatearea();
        timer();
    });

    function generatearea(){
        $("#start").hide();
        $("#timearea").show();
        $("#question").show();
        $("#answers").show();
        var timer = "<p class='timer'> Time Remaining: <span class='time'>10</span></p>";
        var currentquestion = "<p>" + questions[questionCounter] + "</p>";
        var displayanswers = "<p class='answer btn btn-success' type='button'>A. " + answers[questionCounter][0] + "</p><br><p class='answer btn btn-success' type='button'>B. "+ answers[questionCounter][1]+"</p><br><p class='answer btn btn-success' type='button'>C. " + answers[questionCounter][2]+"</p><br><p class='answer btn btn-success' type='button'>D. "+ answers[questionCounter][3]+"</p>";
        $("#timearea").append(timer);
        $("#question").append(currentquestion);
        $("#answers").append(displayanswers);
    }

    $("body").on("click",".answer", function(event){
        selectedAnswer = $(this).text().trim();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(Clock);
            Win();
        }
        else {
            Loss();
        }
    });

    $("#reset-button").on("click", function(event){
        reset();
    });

    function reset(){
        $("#question").empty();
        $("#reset-button").hide();
        questionCounter = 0;
        correctquestions = 0;
        incorrectquestions = 0;
        unansweredquestions = 0;
        counter = 15;
        generatearea();
        timer();
    }

    function clear(){
        $("#timearea").empty();
        $("#question").empty();
        $("#answers").empty();
        $("#correct-answer").empty();
    }

    function LossDueToTimeout() {
        unansweredquestions++;
        clearInterval(Clock);
        $("#answers").hide();
        $("#correct-answer").show();
        $("#correct-answer").append("<p>You ran out of time! <br> The correct answer was: <br>" + correctAnswers[questionCounter] + "</p>" + img[questionCounter]);
        setTimeout(wait, 3000);
    }

    function Win(){
        correctquestions++;
        clearInterval(Clock);
        $("#answers").hide();
        $("#correct-answer").show();
        $("#correct-answer").append("<p>Correct! <br> You chose: <br>" + correctAnswers[questionCounter] + "</p>" + img[questionCounter]);
        setTimeout(wait, 3000);
    }

    function Loss() {
        incorrectquestions++;
        clearInterval(Clock);
        $("#answers").hide();
        $("#correct-answer").show();
        $("#correct-answer").append("<p>Nope! <br> The correct answer was: <br>" + correctAnswers[questionCounter] + "</p>" + img[questionCounter]);
        setTimeout(wait, 3000);
    }

    function wait() {
        if(questionCounter < 9) {
            questionCounter++;
            clear();
            counter = 15;
            generatearea();
            timer();
        }
        else if (questionCounter = 9) {
            finalScreen();
        }
    }
    

    function timer() {
        Clock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(Clock);
                LossDueToTimeout();
            }
            else if (counter > 0) {
                counter--;

            }
            $(".time").html(counter);
        }
    }

    function finalScreen() {
        clear();
        $("#question").append("<h3>That's all! Here are your results: <br> Correct Answers: " + correctquestions + "<br> Incorrect Answers: " + incorrectquestions + "<br> Unanswered Questions: " + unansweredquestions + "<h3>");
        $("#reset-button").show();

    }
});

