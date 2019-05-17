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
        `<h2>How well do you know the Bible?</h2>
        <button id="js-startQuiz">Begin your Quest of Bible Knowledge</button>`;
    $("#js-quizInfo").html(homeStartUpString);
    $("#js-questionForm").html("");
}

// Generate the HTML for a single answer
// ! Determine why Required is not working !
function generateAnswerElement(answer, index) {
    return `<label for="answer${index}">${answer}</label>
            <input type="radio" name="answers" id="answer${index}" value="${answer}" required>`;
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
        `<fieldset>
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
    });
}

// Update the DOM to remove the header progress items
function clearProgress() {
    logToggle("clearProgress() ran");
    $("#js-progressNum").text("");
    $("#js-progressScore").text("");
}

// Generate the HTML for result 
function generateResultString( isCorrect ) {
    return `<h2>
                ${isCorrect ? "Hallelujah!" : "Looks like you need more studying!"}
            </h2>
            ${isCorrect ? "" : 
            `<p>The correct answer is: 
                <span class="answerText">${QUESTIONS[currentQuesNum].correctAnswer}</span>
            </p>`}
            <p>You can read this story in ${QUESTIONS[currentQuesNum].bibleText}.</p>
            <button id="js-next">Continue your Quest</button>`;
}

// Update the DOM to display the result of answering a question
function renderQuestionResult( isCorrect ) {
    logToggle("renderQuestionResult() ran");
    
    // Add results to information section
    $("#js-quizInfo").html(generateResultString(isCorrect));

    // Remove question
    $("#js-questionForm").html("");
    renderProgress();
       
    // Bible Gateway JS Utility to convert Bible references into URL links
    BGLinks.version = "NLT";
    BGLinks.linkVerses();
}

// Event handler for the Question form Submit Button
//   Determines whether user answered question correctly
function handleQuestionSubmit() {
    $("#js-questionForm").on("click", "#js-submitAnswer", event => {
        logToggle("handleQuestionSubmit() ran");
        event.preventDefault();
        const userAnswer = $("input[type='radio']:checked").val();
        let userIsCorrect = QUESTIONS[currentQuesNum].correctAnswer === userAnswer;
        score += userIsCorrect ? 1 : 0;
        renderQuestionResult(userIsCorrect);
    });
}

// Generate the HTML for final quiz results
function generateFinalResultString(isWinner) {
    return `<h2>
                ${isWinner ? 
                "The Wisdom of God is in you!" : 
                "Do not be discouraged!<br>God is with you wherever you may go."}
            </h2>
            <p>You scored <span class="score">${score}/10</span>!</p>
            ${isWinner ? 
                `<h2>Therefore, go and make disciples of all the nations!</h2>
                    <p>Matthew 28:19</p>` : 
                `<h2>Let the message about Christ, in all its richness, fill your life!</h2>
                    <p>Colossians 3:16</p>`}
            <button id="js-resetQuiz">Restart your Quest</button>`;
}

// Update the DOM to display the final result of the quiz
function renderQuizResult( isWinner ) {
    logToggle("renderQuizResult() ran");
    
    // Add results to information section
    $("#js-quizInfo").html(generateFinalResultString(isWinner));

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
    });
}

// Starts the Event handlers used to run the Quiz
function handleQuiz() {
    logToggle("handleQuiz() ran");

    renderQuizHome();
    handleStartButton();
    handleQuestionSubmit();
    handleNextButton();
    handleResetButton();
}

// Execute document.ready() to start the quiz app
$(handleQuiz);