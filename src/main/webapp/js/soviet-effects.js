// Soviet-style 90s JavaScript Effects

// Show loading screen on page load
window.addEventListener('load', function() {
    const loader = document.getElementById('soviet-loader');
    loader.style.display = 'block';
    
    // Hide loader after 3 seconds (simulating dial-up loading)
    setTimeout(() => {
        loader.style.display = 'none';
    }, 3000);
});

// Visitor counter with Soviet flair
let visitorCount = 1337;
function updateVisitorCounter() {
    visitorCount += Math.floor(Math.random() * 3) + 1;
    document.getElementById('visitorCount').textContent = visitorCount.toString().padStart(8, '0');
}

// Update visitor count every 5 seconds
setInterval(updateVisitorCounter, 5000);

// Sparkles effect when clicking
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkles = ['☭', '⭐', '✨', '💫', '🔥', '⚡'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.color = ['#FFD700', '#FF0000', '#00FF00', '#FF00FF'][Math.floor(Math.random() * 4)];
    
    document.getElementById('sparkles').appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Soviet anthem sound effect (base64 encoded beep)
function playGloriousSovietSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR2fPNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvGIcBjiR!' );
    audio.volume = 0.1;
    audio.play().catch(() => {}); // Ignore errors if sound can't play
}

// Add Soviet sounds to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', playGloriousSovietSound);
    });
});

// Simulate dial-up image loading for the stripper gif
document.addEventListener('DOMContentLoaded', function() {
    const stripperImg = document.getElementById('stripperGif');
    if (stripperImg) {
        stripperImg.style.display = 'none';
        
        // Simulate slow loading
        let loadProgress = 0;
        const loadInterval = setInterval(() => {
            loadProgress += Math.random() * 20;
            if (loadProgress >= 100) {
                stripperImg.style.display = 'block';
                stripperImg.classList.add('image-loading');
                clearInterval(loadInterval);
            }
        }, 200);
    }
});

// Add random Soviet quotes
const sovietQuotes = [
    "В СОВЕТСКОЙ РОССИИ, ПИВО ПЬЁТ ТЕБЯ!",
    "ТОВАРИЩ, ЭТО ИГРА ДЛЯ ВСЕХ РАБОЧИХ!",
    "КАПИТАЛИСТИЧЕСКИЕ БУКВЫ НЕ ПРОЙДУТ!",
    "СЛАВА СОВЕТСКОЙ ВИСЕЛИЦЕ!",
    "ВОДКА ПОМОГАЕТ УГАДЫВАТЬ ЛУЧШЕ!"
];

function showRandomSovietQuote() {
    const quote = sovietQuotes[Math.floor(Math.random() * sovietQuotes.length)];
    const quoteDiv = document.createElement('div');
    quoteDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(204, 0, 0, 0.95);
        color: #FFD700;
        padding: 20px;
        border: 5px solid #FFD700;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        animation: blink 0.5s 3;
    `;
    quoteDiv.textContent = quote;
    document.body.appendChild(quoteDiv);
    
    setTimeout(() => {
        quoteDiv.remove();
    }, 3000);
}

// Show random quote every 30 seconds
setInterval(showRandomSovietQuote, 30000);

// Make the stripper dance more when hovered
document.addEventListener('DOMContentLoaded', function() {
    const stripperCorner = document.querySelector('.stripper-corner');
    if (stripperCorner) {
        stripperCorner.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.3s infinite, spin 1s linear infinite';
        });
        
        stripperCorner.addEventListener('mouseleave', function() {
            this.style.animation = 'bounce 2s infinite';
        });
    }
});

// Add floating hammers and sickles
function createFloatingSymbol() {
    const symbols = ['☭', '🔨', '⚒️'];
    const symbol = document.createElement('div');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.cssText = `
        position: fixed;
        font-size: 30px;
        color: #FFD700;
        pointer-events: none;
        animation: float-across 10s linear infinite;
        top: ${Math.random() * window.innerHeight}px;
        left: -50px;
        z-index: 100;
    `;
    
    const floatKeyframes = `
        @keyframes float-across {
            from { transform: translateX(-50px) rotate(0deg); }
            to { transform: translateX(${window.innerWidth + 50}px) rotate(360deg); }
        }
    `;
    
    if (!document.querySelector('#float-style')) {
        const style = document.createElement('style');
        style.id = 'float-style';
        style.textContent = floatKeyframes;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(symbol);
    
    setTimeout(() => {
        symbol.remove();
    }, 10000);
}

// Create floating symbols every 5 seconds
setInterval(createFloatingSymbol, 5000);