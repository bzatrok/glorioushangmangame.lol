# Vladimir's Soviet Hangman Game Specification

## Overview
A Soviet-themed web-based Hangman game featuring beer-related words, communist aesthetics, and interactive gameplay. The game is built with Java servlets and deployed via Docker.

## Technical Stack
- **Backend**: Java 11+ with Servlets
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Build System**: Maven
- **Server**: Jetty Runner
- **Deployment**: Docker (multi-platform: ARM64/AMD64)
- **Domain**: glorioushangmangame.lol

## Game Features

### Core Gameplay
- Classic hangman mechanics with 6 wrong guess limit
- Beer-themed word list (300+ words)
- Letter and full word guessing support
- Session-based game state management
- Visual hangman drawing progression

### Soviet Theme Elements
- ☭ Hammer and sickle symbols throughout UI
- Red color scheme (#FF0000, #CC0000)
- Soviet-style messages and feedback
- Communist party slogans
- References to vodka, motherland, and comrades

### Special Features
1. **Soviet Anthem**: Auto-plays instrumental version on page load (2-second delay)
2. **Stalin Disappointment**: Shows Stalin's disappointed image when player loses
3. **Live Visitor Counter**: Tracks total visitors (starts at 1337)
4. **Retro Effects**: 
   - CRT screen lines animation
   - Scrolling marquee text
   - Sparkle animations
   - Loading screen with progress bar

### User Interface
- Responsive design with mobile optimizations
- Retro computer terminal aesthetic
- "Under Construction" banner (90s web style)
- Hot comrade girl animation (desktop only)
- Soviet flag decorations
- Playboy-style frame elements

## API Endpoints

### Game Management
- `POST /api/game/new` - Start new game
- `GET /api/game/state` - Get current game state
- `POST /api/game/guess` - Submit guess (letter or word)

### Visitor Tracking
- `GET /api/visitors` - Get visitor count

## Game State Structure
```json
{
  "secretWord": "VODKA",
  "maskedWord": "V _ _ _ _",
  "guessedLetters": ["A", "E"],
  "guessedWords": [],
  "wrongGuesses": 2,
  "gameOver": false,
  "won": false
}
```

## Security & Performance

### Caching Prevention
- Dynamic timestamps on CSS/JS resources
- No-cache headers on all responses
- JSP-based dynamic content generation

### Session Management
- 30-minute session timeout
- Server-side game state storage
- Thread-safe visitor counting

### Mobile Optimizations
- Touch manipulation disabled (no double-tap zoom)
- Fixed viewport settings
- Hidden decorative elements on small screens
- Responsive text sizing

## Deployment Configuration

### Docker Setup
```yaml
services:
  hangman:
    image: amberglass/hangman:v2.2
    container_name: hangman-game
    ports:
      - "7583:8080"
    restart: unless-stopped
    environment:
      - JAVA_OPTS=-Xmx512m
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/api/game/state"]
```

### Server Requirements
- Java 17 runtime
- 512MB RAM allocation
- Port 8080 (internal) mapped to 7583 (external)
- Health check endpoint for monitoring

## Browser Compatibility
- Modern browsers with JavaScript enabled
- UTF-8 encoding support required
- Audio playback capability for anthem
- CSS3 animations support

## Unique Selling Points
1. Authentic Soviet atmosphere with period-appropriate messaging
2. Educational beer vocabulary expansion
3. Nostalgic 90s web design elements
4. Multi-language puns and references
5. Hidden easter eggs and animations

## Future Enhancements (Potential)
- Leaderboard system
- Difficulty levels
- Custom word lists
- Multiplayer support
- Achievement system
- More Soviet-era sound effects