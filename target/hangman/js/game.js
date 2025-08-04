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
        showMessage('☭ ВВЕДИ БУКВУ ИЛИ СЛОВО ТОВАРИЩ! ☭', 'info');
        return;
    }
    
    if (currentGameState && currentGameState.gameOver) {
        showMessage('☭ ИГРА ОКОНЧЕНА! НАЧНИ НОВУЮ ИГРУ ДЛЯ РОДИНЫ! ☭', 'info');
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
            const successMessages = [
                `☭ ОТЛИЧНО ТОВАРИЩ! "${data.guess}" ПРАВИЛЬНО! ☭`,
                `☭ СЛАВА! "${data.guess}" В СЛОВЕ! ДЛЯ РОДИНЫ! ☭`,
                `☭ ХОРОШО! "${data.guess}" УГАДАНО! ВОДКА ДЛЯ ВСЕХ! ☭`
            ];
            showMessage(successMessages[Math.floor(Math.random() * successMessages.length)], 'success');
        } else {
            const errorMessages = [
                `☭ НЕТ ТОВАРИЩ! "${data.guess}" НЕПРАВИЛЬНО! В ГУЛАГ! ☭`,
                `☭ ПЛОХО! "${data.guess}" НЕ В СЛОВЕ! БОЛЬШЕ ВОДКИ! ☭`,
                `☭ КАПИТАЛИСТИЧЕСКАЯ ОШИБКА! "${data.guess}" НЕТ! ☭`
            ];
            showMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)], 'error');
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
        const winMessages = [
            `☭ ПОБЕДА ТОВАРИЩ! СЛОВО БЫЛО "${gameState.secretWord}"! СЛАВА КОММУНИЗМУ! ☭`,
            `☭ ОТЛИЧНО! ТЫ ВЫИГРАЛ! "${gameState.secretWord}" - ДЛЯ РОДИНЫ! ☭`,
            `☭ ВЕЛИКАЯ ПОБЕДА! "${gameState.secretWord}" УГАДАНО! ВОДКА И ИКРА! ☭`
        ];
        showMessage(winMessages[Math.floor(Math.random() * winMessages.length)], 'success');
    } else {
        const loseMessages = [
            `☭ ПОРАЖЕНИЕ ТОВАРИЩ! СЛОВО БЫЛО "${gameState.secretWord}"! В СИБИРЬ НА ПЕРЕВОСПИТАНИЕ! ☭`,
            `☭ КАПИТАЛИСТИЧЕСКИЙ ПРОВАЛ! "${gameState.secretWord}" НЕ УГАДАНО! БОЛЬШЕ ТРЕНИРОВКИ! ☭`,
            `☭ НЕТ ПОБЕДЫ! СЛОВО "${gameState.secretWord}"! КГБ НАБЛЮДАЕТ! ☭`
        ];
        showMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)], 'error');
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