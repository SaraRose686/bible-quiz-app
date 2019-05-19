"use strict";

import { QUESTIONS } from "./data.js";

// Universal variables to keep track of quiz state
let currentQuesNum = 0;
let score = 0;

// Simple utility to control whether console log will display
const LOG_ON = false;
const logToggle = msg => {
    if( LOG_ON ) {
        console.log(msg);
    }
}

// shuffles the items in an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

// Update the DOM to display the header progress items
function renderProgress() {
    logToggle("renderProgress() ran");
    $("#js-progressNum").text(`# ${currentQuesNum+1}`);
    $("#js-progressScore").text(`Score: ${score}/10`);
}

// Update the DOM to display the home screen of the quiz
function renderQuizHome() {
    logToggle("renderQuizHome() ran");
    const homeStartUpString = 
        `<h2 id="intro">How well do you know the Bible?</h2>
        <button id="js-startQuiz">Begin your Quest</button>`;
    $("#js-quizInfo").html(homeStartUpString);
    $("#js-questionForm").html("");
}

// Generate the HTML for a single answer
function generateAnswerElement(answer, index) {
    return `<input type="radio" tabindex="-1" name="answers" id="answer${index}" value="${answer}">
            <label class="answerLabel" tabindex="0" onclick="submit()" role="button" for="answer${index}">${answer}</label>`;
}
  
// Generate the HTML string for all answers
function generateAnswerString(answers) {
    logToggle("Generating answer elements");
    const answerHTML = answers.map( (ans, index) => generateAnswerElement(ans, index));
    return answerHTML.join("");
}

// Update the DOM to display the current question
function renderQuestion() {
    logToggle("renderQuestion() ran");
    const currentQuestion = QUESTIONS[currentQuesNum];
    shuffle(currentQuestion.answers);

    // Create HTML for Question Form
    const questionHTMLString = 
        `<fieldset id="questionAnswerSet">
            <legend>${currentQuestion.question}</legend>
            ${generateAnswerString(currentQuestion.answers)}
            <button type="submit" id="js-submitAnswer">And God said...</button>
        </fieldset>`;

    // Remove current info section
    $("#js-quizInfo").html("");
    // Add question form
    $("#js-questionForm").html(questionHTMLString);
    renderProgress();
}

// Event handler for the Start Button
function handleStartButton() {
    $("#js-quizInfo").on("click", "#js-startQuiz", event => {
        logToggle("handleStartButton() ran");
        shuffle(QUESTIONS);
        renderQuestion();
        // Change background for questions
        $("body").css("background-image", "url(images/aaron-burden-320238-unsplash.jpg)");
    });
}

// Update the DOM to remove the header progress items
function clearProgress() {
    logToggle("clearProgress() ran");
    $("#js-progressNum").text("");
    $("#js-progressScore").text("");
}

// Generate the HTML for result 
function generateQuestionResultString( isCorrect ) {
    return `<div id="result">
                <h2>${isCorrect ? "Hallelujah!" : "Looks like you need more studying!"}</h2>
                ${isCorrect ? "" : 
                `<p>The correct answer is: 
                    <span id="answerText">${QUESTIONS[currentQuesNum].correctAnswer}.</span>
                </p>`}
                <p>You can read this story in ${QUESTIONS[currentQuesNum].bibleText}.</p>
            </div>
            <button id="js-next">Continue your Quest</button>`;
}

// Update the DOM to display the result of answering a question
function renderQuestionResult( isCorrect ) {
    logToggle("renderQuestionResult() ran");
    
    // Add results to information section
    $("#js-quizInfo").html(generateQuestionResultString(isCorrect));

    // Remove question
    $("#js-questionForm").html("");
    renderProgress();
       
    // Bible Gateway JS Utility to convert Bible references into URL links
    BGLinks.version = "NLT";
    BGLinks.linkVerses();
}

// Determines whether user answered question correctly
function determineQuestionResult() {
    const userAnswer = $("input[type='radio']:checked").val();
    let userIsCorrect = QUESTIONS[currentQuesNum].correctAnswer === userAnswer;
    score += userIsCorrect ? 1 : 0;
    renderQuestionResult(userIsCorrect);
}

// Event handler for validating the Question form
function handleValidateForm() {
    $("#js-questionForm").validate( {
        submitHandler: (form,event) => { 
            event.preventDefault();
            determineQuestionResult();
        },
        rules: {   
            answers: "required"
        },
        messages: {
            answers: {
                required:"<i class='fas fa-dove'></i> Please select a response!"
            }
        },
        errorPlacement: (error, element) => {
            if ( element.is(":radio") ) {
                error.prependTo( element.parents('#questionAnswerSet') );
            }
            else { // This is the default behavior
                error.insertAfter( element );
            }
        }
    });
}       
        

// Generate the HTML for final quiz results
function generateQuizResultString(isWinner) {
    return `<div id="result">
                <h2>${isWinner ? 
                    "The Wisdom of God is in you!" : 
                    "Do not be discouraged!<br>God is with you wherever you may go."}
                </h2>
                <p id="finalScore">You scored ${score}/10!</p>
                ${isWinner ? 
                    `<h3>"Therefore, go and make disciples of all the nations!"</h3>
                        <p>Matthew 28:19</p>` : 
                    `<h3>"Let the message about Christ, in all its richness, fill your life!"</h3>
                        <p>Colossians 3:16</p>`}
            </div>
            <button id="js-resetQuiz">Restart your Quest</button>`;
}

// Update the DOM to display the final result of the quiz
function renderQuizResult( isWinner ) {
    logToggle("renderQuizResult() ran");
    
    // Add results to information section
    $("#js-quizInfo").html(generateQuizResultString(isWinner));

    // Remove question
    $("#js-questionForm").html("");
    clearProgress();
       
    // Bible Gateway JS Utility to convert Bible references into URL links
    BGLinks.version = "NLT";
    BGLinks.linkVerses();
}

// Event handler for the Next Button
function handleNextButton() {
    $("#js-quizInfo").on("click", "#js-next", event => {
        logToggle("handleNextButton() ran");
        currentQuesNum += 1;
        if( currentQuesNum < 10 ) {
            renderQuestion();
        }
        else {
            renderQuizResult( score > 5 );
        }
    });
}

// Event handler for the Reset Button
function handleResetButton() {
    $("#js-quizInfo").on("click", "#js-resetQuiz", event => {
        logToggle("handleResetButton() ran");
        currentQuesNum = 0;
        score = 0;
        renderQuizHome();
        // Change Background for Home screen
        $("body").css("background-image", "url(images/aaron-burden-759770-unsplash.jpg)");
    });
}

// Starts the Event handlers used to run the Quiz
function handleQuiz() {
    logToggle("handleQuiz() ran");

    renderQuizHome();
    handleStartButton();
    handleValidateForm();
    handleNextButton();
    handleResetButton();
}

// Start the quiz app
$(handleQuiz);