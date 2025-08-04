let currentGameState = null;

const bodyParts = ['head', 'body', 'leftarm', 'rightarm', 'leftleg', 'rightleg'];

async function newGame() {
    try {
        const response = await fetch('/api/game/new', { method: 'POST' });
        const data = await response.json();
        updateGameDisplay(data);
        clearMessage();
        document.getElementById('guessInput').value = '';
        document.getElementById('guessInput').focus();
    } catch (error) {
        showMessage('Error starting new game: ' + error.message, 'error');
    }
}

async function getGameState() {
    try {
        const response = await fetch('/api/game/state');
        const data = await response.json();
        updateGameDisplay(data);
    } catch (error) {
        showMessage('Error getting game state: ' + error.message, 'error');
    }
}

async function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.trim().toUpperCase();
    
    if (!guess) {
        showMessage('Please enter a letter or word', 'info');
        return;
    }
    
    if (currentGameState && currentGameState.gameOver) {
        showMessage('Game is over! Start a new game.', 'info');
        return;
    }
    
    try {
        const response = await fetch('/api/game/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'guess=' + encodeURIComponent(guess)
        });
        
        if (!response.ok) {
            throw new Error('Invalid guess');
        }
        
        const data = await response.json();
        updateGameDisplay(data.gameState);
        
        if (data.correct) {
            showMessage(`Good guess! "${data.guess}" is ${data.type === 'letter' ? 'in the word' : 'correct'}!`, 'success');
        } else {
            showMessage(`Sorry! "${data.guess}" is ${data.type === 'letter' ? 'not in the word' : 'incorrect'}.`, 'error');
        }
        
        guessInput.value = '';
        guessInput.focus();
        
        if (data.gameState.gameOver) {
            handleGameOver(data.gameState);
        }
    } catch (error) {
        showMessage('Error making guess: ' + error.message, 'error');
    }
}

function updateGameDisplay(gameState) {
    currentGameState = gameState;
    
    document.getElementById('wordDisplay').textContent = gameState.maskedWord;
    document.getElementById('wrongCount').textContent = gameState.wrongGuesses;
    
    const guessedLettersSpan = document.getElementById('guessedLetters');
    guessedLettersSpan.textContent = gameState.guessedLetters.length > 0 
        ? Array.from(gameState.guessedLetters).sort().join(', ') 
        : 'None';
    
    const guessedWordsSpan = document.getElementById('guessedWords');
    guessedWordsSpan.textContent = gameState.guessedWords.length > 0 
        ? Array.from(gameState.guessedWords).sort().join(', ') 
        : 'None';
    
    updateHangmanDrawing(gameState.wrongGuesses);
    
    document.getElementById('guessButton').disabled = gameState.gameOver;
    document.getElementById('guessInput').disabled = gameState.gameOver;
}

function updateHangmanDrawing(wrongGuesses) {
    bodyParts.forEach((part, index) => {
        const element = document.getElementById(part);
        if (index < wrongGuesses) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

function handleGameOver(gameState) {
    if (gameState.won) {
        showMessage(`Congratulations! You won! The word was "${gameState.secretWord}".`, 'success');
    } else {
        showMessage(`Game Over! The word was "${gameState.secretWord}".`, 'error');
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';
}

function clearMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
}

document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

window.onload = function() {
    getGameState();
    document.getElementById('guessInput').focus();
};