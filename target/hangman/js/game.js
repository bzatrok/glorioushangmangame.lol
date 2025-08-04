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
        showMessage('☭ ENTER LETTER OR WORD COMRADE! ☭', 'info');
        return;
    }
    
    if (currentGameState && currentGameState.gameOver) {
        showMessage('☭ GAME OVER! START NEW GAME FOR MOTHERLAND! ☭', 'info');
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
                `☭ EXCELLENT COMRADE! "${data.guess}" CORRECT! ☭`,
                `☭ GLORY! "${data.guess}" IN WORD! FOR MOTHERLAND! ☭`,
                `☭ GOOD! "${data.guess}" GUESSED! VODKA FOR ALL! ☭`
            ];
            showMessage(successMessages[Math.floor(Math.random() * successMessages.length)], 'success');
        } else {
            const errorMessages = [
                `☭ NO COMRADE! "${data.guess}" IS WRONG! TO GULAG! ☭`,
                `☭ BAD! "${data.guess}" NOT IN WORD! MORE VODKA! ☭`,
                `☭ CAPITALIST ERROR! "${data.guess}" NO! ☭`
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
            `☭ VICTORY COMRADE! WORD WAS "${gameState.secretWord}"! GLORY TO COMMUNISM! ☭`,
            `☭ EXCELLENT! YOU WON! "${gameState.secretWord}" - FOR MOTHERLAND! ☭`,
            `☭ GREAT VICTORY! "${gameState.secretWord}" GUESSED! VODKA AND CAVIAR! ☭`
        ];
        showMessage(winMessages[Math.floor(Math.random() * winMessages.length)], 'success');
    } else {
        const loseMessages = [
            `☭ DEFEAT COMRADE! WORD WAS "${gameState.secretWord}"! TO SIBERIA FOR RE-EDUCATION! ☭`,
            `☭ CAPITALIST FAILURE! "${gameState.secretWord}" NOT GUESSED! MORE TRAINING! ☭`,
            `☭ NO VICTORY! WORD "${gameState.secretWord}"! KGB IS WATCHING! ☭`
        ];
        showMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)], 'error');
        showStalinImage();
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

function showStalinImage() {
    // Create Stalin overlay
    const stalinOverlay = document.createElement('div');
    stalinOverlay.id = 'stalin-overlay';
    stalinOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(204, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: stalin-appear 1s ease-in;
    `;
    
    // Add Stalin image
    const stalinImg = document.createElement('img');
    stalinImg.src = 'https://preview.redd.it/hum32lholr341.jpg?width=640&crop=smart&auto=webp&s=97a275ae502f69b36d207f9d60f9448975f43819';
    stalinImg.style.cssText = `
        max-width: 90%;
        max-height: 70%;
        border: 5px solid #FFD700;
        border-radius: 10px;
        box-shadow: 0 0 30px #FFD700;
        animation: stalin-pulse 2s infinite;
    `;
    stalinImg.alt = 'Disappointed Stalin';
    
    // Add text
    const stalinText = document.createElement('div');
    stalinText.innerHTML = `
        <div style="color: #FFD700; font-size: 36px; font-weight: bold; text-align: center; margin-top: 20px; text-shadow: 2px 2px 0px #CC0000; font-family: 'Ruslan Display', 'Arial Black', serif;">
            ☭ STALIN IS DISAPPOINTED ☭<br>
            <span style="font-size: 24px;">Click to continue...</span>
        </div>
    `;
    
    stalinOverlay.appendChild(stalinImg);
    stalinOverlay.appendChild(stalinText);
    
    // Add click handler to close
    stalinOverlay.addEventListener('click', () => {
        stalinOverlay.remove();
    });
    
    // Add CSS animation keyframes
    if (!document.querySelector('#stalin-animations')) {
        const style = document.createElement('style');
        style.id = 'stalin-animations';
        style.textContent = `
            @keyframes stalin-appear {
                from { opacity: 0; transform: scale(0.5); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes stalin-pulse {
                0%, 100% { transform: scale(1); filter: brightness(1); }
                50% { transform: scale(1.05); filter: brightness(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(stalinOverlay);
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