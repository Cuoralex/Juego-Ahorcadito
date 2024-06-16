module HangmanGame {
  const words: string[] = ["javascript", "html", "css", "programacion", "desarrollo"];
  let selectedWord: string = words[Math.floor(Math.random() * words.length)];
  let attempts: number = 6;
  let guessedLetters: string[] = [];
  let correctGuesses: number = 0;

  const wordContainer: HTMLElement | null = document.getElementById("word-container");
  const message: HTMLElement | null = document.getElementById("message");
  const remainingAttemptsSpan: HTMLElement | null = document.getElementById("remaining-attempts");
  const letterButtonsContainer: HTMLElement | null = document.getElementById("letter-buttons");
  const resetButton: HTMLElement | null = document.getElementById("reset-button");

  function displayWord(): void {
    if (wordContainer) {
      wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.indexOf(letter) !== -1 ? letter : "_"))
        .join(" ");
    }
  }

  function createLetterButtons(): void {
    if (letterButtonsContainer) {
      const letters: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
      letterButtonsContainer.innerHTML = "";
      letters.forEach(letter => {
        const button: HTMLButtonElement = document.createElement("button");
        button.innerText = letter;
        button.addEventListener("click", () => handleGuess(letter));
        letterButtonsContainer.appendChild(button);
      });
    }
  }

  function handleGuess(letter: string): void {
    guessedLetters.push(letter);
    const button: HTMLButtonElement | null = document.querySelector(`button:contains(${letter})`);
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
    } else {
      attempts--;
      if (remainingAttemptsSpan) {
        remainingAttemptsSpan.innerText = attempts.toString();
      }
      const hangmanFigure: HTMLElement | null = document.getElementById("hangman-figure");
      if (hangmanFigure) {
        const part: HTMLElement | null = hangmanFigure.children[6 - attempts - 1] as HTMLElement;
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

  function endGame(): void {
    if (letterButtonsContainer) {
      Array.prototype.forEach.call(letterButtonsContainer.children, (button: HTMLButtonElement) => {
        button.disabled = true;
      });
    }
  }

  function resetGame(): void {
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
    const hangmanFigure: HTMLElement | null = document.getElementById("hangman-figure");
    if (hangmanFigure) {
      Array.prototype.forEach.call(hangmanFigure.children, (part: HTMLElement) => {
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
}

export {};
