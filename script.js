// STEP 1: NAME ALL CONSTANTS
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const scoreDiv = document.getElementById("scoreContainer");

// STEP 2: CREATE ARRAY OF QUESTIONS
let questions = [
    {
        question : "What are HTML tags?",
        imgSrc : "images/html.png",
        choiceA : "Code with brackets, and letters within those brackets",
        choiceB : "The tags that set off alarms at the store if you try to steal something.",
        choiceC : "Neither of these.",
        correct : "A"
    },
    {
        question : "What does HTML stand for?",
        imgSrc : "images/html.png",
        choiceA : "Hypertrophic Management Language",
        choiceB : "Hypertext Markup Language",
        choiceC : "How To Make Language",
        correct : "B"
    },
    {
        question : "What is the correct HTML for referring to an external style sheet?",
        imgSrc : "images/css.png",
        choiceA : "style src=mystyle.css",
        choiceB : "link rel='stylesheet' type='text/css' href='mystyle.css'",
        choiceC : "stylesheet>mystyle.css</stylesheet",
        correct : "B"
    },
    {
        question : "Inside which HTML element do we put the JavaScript?",
        imgSrc : "images/js.png",
        choiceA : "js",
        choiceB : "javascript",
        choiceC : "script",
        correct : "C"
    },
    {
        question : "What is the correct syntax for referring to an external script called 'xxx.js'?",
        imgSrc : "images/js.png",
        choiceA : "script name='xxx.js'",
        choiceB : "script src='xxx.js'",
        choiceC : "script href='xxx.js'",
        correct : "B"
    }
 
];

//STEP 3: DEVELOP VARIABLES

const lastQuestion = questions.length - 1;
let continuousQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// STEP 4: RENDER QUESTION
function renderQuestion(){
    let q = questions[continuousQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    questionImage.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// STEP 5: START THE QUIZ AND TIMER
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

// STEP 6: SHOW TIMER
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(continuousQuestion < lastQuestion){
            continuousQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// STEP 7: IS ANSWER CORRECT?
function checkAnswer(answer){
    if( answer == questions[continuousQuestion].correct){
        // answer is correct
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(continuousQuestion < lastQuestion){
        continuousQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(continuousQuestion);
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(continuousQuestion);
}

// STEP 10: SHOW FINAL SCORE
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // CALCULATE SCORE
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // LET VIEWER SEE HOW THEY DID!
    let img = (scorePerCent >= 80) ? "images/5.png" :
              (scorePerCent >= 60) ? "images/4.png" :
              (scorePerCent >= 40) ? "images/3.png" :
              (scorePerCent >= 20) ? "images/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}