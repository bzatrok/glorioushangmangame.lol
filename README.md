# Vladimir's Beer Hangman Game

A web-based Hangman game built with Java servlets and vanilla JavaScript, featuring beer types as the word list.

## Features

- Single-player Hangman game with beer-themed words
- Support for both letter and word guesses
- Visual hangman progression with 6 body parts (head, body, 2 arms, 2 legs)
- Maximum of 6 incorrect guesses before game over
- Responsive web interface
- Session-based game state management

## Beer Types Word List

The game randomly selects from the following beer types:
- LAGER, PILSNER, STOUT, PORTER, ALE, IPA, WHEAT, LAMBIC, BOCK, HEFEWEIZEN
- SAISON, TRIPEL, DUBBEL, KOLSCH, MARZEN, DUNKEL, WITBIER, GOSE, SOUR, BARLEYWINE

## Prerequisites

- Java 11 or higher
- Maven 3.6 or higher

## Building the Project

```bash
mvn clean package
```

## Running the Application

### Using Maven Jetty Plugin

```bash
mvn jetty:run
```

The application will be available at `http://localhost:8080`

### Deploying to a Servlet Container

After building, deploy the generated `target/hangman.war` file to any servlet container (Tomcat, Jetty, etc.).

## How to Play

1. Open your web browser and navigate to the application URL
2. A random beer type will be selected as the secret word
3. Enter a single letter or attempt to guess the entire word
4. Each incorrect guess adds a body part to the hangman drawing
5. You win if you guess the word before making 6 mistakes
6. Click "New Game" to start over

## Project Structure

```
Pete.Hangman/
├── pom.xml                          # Maven configuration
├── src/
│   ├── main/
│   │   ├── java/com/pete/hangman/
│   │   │   ├── model/
│   │   │   │   ├── BeerWords.java  # Word list and selection
│   │   │   │   ├── HangmanGame.java # Game logic
│   │   │   │   └── GameState.java   # Game state representation
│   │   │   └── servlet/
│   │   │       └── GameServlet.java # REST API endpoints
│   │   └── webapp/
│   │       ├── index.html           # Main game page
│   │       ├── css/
│   │       │   └── style.css        # Game styling
│   │       ├── js/
│   │       │   └── game.js          # Frontend game logic
│   │       └── WEB-INF/
│   │           └── web.xml          # Web app configuration
│   └── test/                        # Test directory
└── README.md                        # This file
```

## API Endpoints

- `POST /api/game/new` - Start a new game
- `GET /api/game/state` - Get current game state
- `POST /api/game/guess?guess={letter_or_word}` - Make a guess

## Technical Details

- Backend: Java Servlets with session management
- Frontend: Vanilla JavaScript with async/await for API calls
- Graphics: SVG-based hangman drawing
- Data format: JSON for API communication

## License

This project is created for educational purposes.