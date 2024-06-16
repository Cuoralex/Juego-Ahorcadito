"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HangmanGame;
(function (HangmanGame) {
    var words = ["javascript", "html", "css", "programacion", "desarrollo"];
    var selectedWord = words[Math.floor(Math.random() * words.length)];
    var attempts = 6;
    var guessedLetters = [];
    var correctGuesses = 0;
    var wordContainer = document.getElementById("word-container");
    var message = document.getElementById("message");
    var remainingAttemptsSpan = document.getElementById("remaining-attempts");
    var letterButtonsContainer = document.getElementById("letter-buttons");
    var resetButton = document.getElementById("reset-button");
    function displayWord() {
        if (wordContainer) {
            wordContainer.innerHTML = selectedWord
                .split("")
                .map(function (letter) { return (guessedLetters.indexOf(letter) !== -1 ? letter : "_"); })
                .join(" ");
        }
    }
    function createLetterButtons() {
        if (letterButtonsContainer) {
            var letters = "abcdefghijklmnopqrstuvwxyz".split("");
            letterButtonsContainer.innerHTML = "";
            letters.forEach(function (letter) {
                var button = document.createElement("button");
                button.innerText = letter;
                button.addEventListener("click", function () { return handleGuess(letter); });
                letterButtonsContainer.appendChild(button);
            });
        }
    }
    function handleGuess(letter) {
        guessedLetters.push(letter);
        var button = document.querySelector("button:contains(".concat(letter, ")"));
        if (button) {
            button.disabled = true;
        }
        if (selectedWord.indexOf(letter) !== -1) {
            correctGuesses += (selectedWord.match(new RegExp(letter, "g")) || []).length;
            if (correctGuesses === selectedWord.length) {
                if (message) {
                    message.innerText = "¡Ganaste!";
                }
                endGame();
            }
        }
        else {
            attempts--;
            if (remainingAttemptsSpan) {
                remainingAttemptsSpan.innerText = attempts.toString();
            }
            var hangmanFigure = document.getElementById("hangman-figure");
            if (hangmanFigure) {
                var part = hangmanFigure.children[6 - attempts - 1];
                if (part) {
                    part.style.display = "block";
                }
            }
            if (attempts === 0) {
                if (message) {
                    message.innerText = "¡Perdiste!";
                }
                endGame();
            }
        }
        displayWord();
    }
    function endGame() {
        if (letterButtonsContainer) {
            Array.prototype.forEach.call(letterButtonsContainer.children, function (button) {
                button.disabled = true;
            });
        }
    }
    function resetGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        attempts = 6;
        guessedLetters = [];
        correctGuesses = 0;
        if (message) {
            message.innerText = "";
        }
        if (remainingAttemptsSpan) {
            remainingAttemptsSpan.innerText = attempts.toString();
        }
        var hangmanFigure = document.getElementById("hangman-figure");
        if (hangmanFigure) {
            Array.prototype.forEach.call(hangmanFigure.children, function (part) {
                part.style.display = "none";
            });
        }
        displayWord();
        createLetterButtons();
    }
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }
    displayWord();
    createLetterButtons();
})(HangmanGame || (HangmanGame = {}));
