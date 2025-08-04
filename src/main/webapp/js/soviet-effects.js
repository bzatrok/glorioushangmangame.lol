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
    "IN SOVIET RUSSIA, BEER DRINKS YOU!",
    "COMRADE, THIS GAME FOR ALL WORKERS!",
    "CAPITALIST LETTERS SHALL NOT PASS!",
    "GLORY TO SOVIET HANGMAN!",
    "VODKA HELPS GUESS BETTER!"
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

// Soviet Anthem Background Music
let sovietAnthem = null;
let anthemEnabled = false;

function initSovietAnthem() {
    return {
        start: async () => {
            try {
                console.log('Starting Soviet anthem');
                
                // Stream from Wikipedia's public domain Soviet anthem
                const anthemUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Hymn_of_the_Soviet_Union_%281977_Vocal%29.ogg';
                
                const audio = new Audio();
                audio.src = anthemUrl;
                audio.loop = true;
                audio.volume = 0.3; // Keep it reasonable
                audio.crossOrigin = 'anonymous';
                
                // Wait for user interaction before playing
                await audio.play();
                
                sovietAnthem.audioElement = audio;
                anthemEnabled = true;
                
                console.log('Soviet anthem started successfully');
                return true;
            } catch (error) {
                console.log('Failed to start Soviet anthem:', error);
                anthemEnabled = false;
                throw error;
            }
        },
        stop: () => {
            console.log('Stopping Soviet anthem');
            if (sovietAnthem.audioElement) {
                sovietAnthem.audioElement.pause();
                sovietAnthem.audioElement.currentTime = 0;
                sovietAnthem.audioElement = null;
            }
            anthemEnabled = false;
        },
        isPlaying: () => {
            return anthemEnabled && sovietAnthem.audioElement && !sovietAnthem.audioElement.paused;
        },
        audioElement: null
    };
}

// Start Soviet anthem when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add anthem control button with mobile-responsive styling
    const anthemControl = document.createElement('div');
    anthemControl.id = 'anthem-control';
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    anthemControl.style.cssText = `
        position: fixed;
        top: ${isMobile ? '10px' : '20px'};
        right: ${isMobile ? '10px' : '20px'};
        z-index: 10000;
        background: #CC0000;
        border: 3px solid #FFD700;
        padding: ${isMobile ? '8px' : '10px'};
        border-radius: 5px;
        color: #FFD700;
        font-family: "Ruslan Display", "Changa One", "Arial Black", serif;
        font-weight: bold;
        cursor: pointer;
        font-size: ${isMobile ? '12px' : '14px'};
        text-align: center;
        text-shadow: 2px 2px 0px #000000;
        letter-spacing: 1px;
        width: ${isMobile ? '120px' : '160px'};
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
    `;
    anthemControl.innerHTML = `
        ☭ SOVIET ANTHEM ☭<br>
        <span id="anthem-status">OFF</span>
    `;
    
    document.body.appendChild(anthemControl);
    
    // Initialize anthem
    sovietAnthem = initSovietAnthem();
    
    // Add click/touch handler for anthem control
    const toggleAnthem = async () => {
        const statusSpan = document.getElementById('anthem-status');
        
        if (anthemEnabled && sovietAnthem.isPlaying()) {
            sovietAnthem.stop();
            statusSpan.textContent = 'OFF';
            anthemControl.style.background = '#CC0000';
        } else {
            try {
                await sovietAnthem.start();
                statusSpan.textContent = 'ON';
                anthemControl.style.background = '#008000';
            } catch (error) {
                console.log('Failed to start anthem:', error);
                statusSpan.textContent = 'BLOCKED';
                anthemControl.style.background = '#FF6600';
            }
        }
    };
    
    // Add both click and touch events for mobile compatibility
    anthemControl.addEventListener('click', toggleAnthem);
    anthemControl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleAnthem();
    });
    
    // Handle window resize for responsive control
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth <= 768;
        anthemControl.style.fontSize = isMobileNow ? '12px' : '14px';
        anthemControl.style.padding = isMobileNow ? '8px' : '10px';
        anthemControl.style.width = isMobileNow ? '120px' : '160px';
        anthemControl.style.top = isMobileNow ? '10px' : '20px';
        anthemControl.style.right = isMobileNow ? '10px' : '20px';
    });
    
    // Auto-start anthem only after user interaction (safer for browsers)
    let hasUserInteracted = false;
    
    const enableAutoStart = () => {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            // Wait a bit after first interaction, then start anthem
            setTimeout(() => {
                if (!anthemEnabled) {
                    toggleAnthem().catch(() => {
                        console.log('Auto-start failed - user interaction required');
                    });
                }
            }, 1000);
        }
    };
    
    // Listen for any user interaction
    document.addEventListener('click', enableAutoStart, { once: true });
    document.addEventListener('keydown', enableAutoStart, { once: true });
    document.addEventListener('touchstart', enableAutoStart, { once: true });
});