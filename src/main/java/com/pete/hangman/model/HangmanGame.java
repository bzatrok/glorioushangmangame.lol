package com.pete.hangman.model;

import java.util.HashSet;
import java.util.Set;

public class HangmanGame {
    private final String secretWord;
    private final Set<Character> guessedLetters;
    private final Set<String> guessedWords;
    private int wrongGuesses;
    private static final int MAX_WRONG_GUESSES = 6;
    private boolean gameOver;
    private boolean won;
    
    public HangmanGame() {
        this.secretWord = BeerWords.getRandomWord();
        this.guessedLetters = new HashSet<>();
        this.guessedWords = new HashSet<>();
        this.wrongGuesses = 0;
        this.gameOver = false;
        this.won = false;
    }
    
    public HangmanGame(String word) {
        this.secretWord = word.toUpperCase();
        this.guessedLetters = new HashSet<>();
        this.guessedWords = new HashSet<>();
        this.wrongGuesses = 0;
        this.gameOver = false;
        this.won = false;
    }
    
    public boolean guessLetter(char letter) {
        if (gameOver) {
            throw new IllegalStateException("Game is already over");
        }
        
        letter = Character.toUpperCase(letter);
        
        if (guessedLetters.contains(letter)) {
            return false;
        }
        
        guessedLetters.add(letter);
        
        if (secretWord.indexOf(letter) == -1) {
            wrongGuesses++;
            if (wrongGuesses >= MAX_WRONG_GUESSES) {
                gameOver = true;
                won = false;
            }
            return false;
        }
        
        if (isWordComplete()) {
            gameOver = true;
            won = true;
        }
        
        return true;
    }
    
    public boolean guessWord(String word) {
        if (gameOver) {
            throw new IllegalStateException("Game is already over");
        }
        
        word = word.toUpperCase();
        
        if (guessedWords.contains(word)) {
            return false;
        }
        
        guessedWords.add(word);
        
        if (word.equals(secretWord)) {
            gameOver = true;
            won = true;
            return true;
        } else {
            wrongGuesses++;
            if (wrongGuesses >= MAX_WRONG_GUESSES) {
                gameOver = true;
                won = false;
            }
            return false;
        }
    }
    
    public String getMaskedWord() {
        StringBuilder masked = new StringBuilder();
        for (char c : secretWord.toCharArray()) {
            if (guessedLetters.contains(c)) {
                masked.append(c);
            } else {
                masked.append('_');
            }
            masked.append(' ');
        }
        return masked.toString().trim();
    }
    
    private boolean isWordComplete() {
        for (char c : secretWord.toCharArray()) {
            if (!guessedLetters.contains(c)) {
                return false;
            }
        }
        return true;
    }
    
    public String getSecretWord() {
        return secretWord;
    }
    
    public Set<Character> getGuessedLetters() {
        return new HashSet<>(guessedLetters);
    }
    
    public Set<String> getGuessedWords() {
        return new HashSet<>(guessedWords);
    }
    
    public int getWrongGuesses() {
        return wrongGuesses;
    }
    
    public int getRemainingGuesses() {
        return MAX_WRONG_GUESSES - wrongGuesses;
    }
    
    public boolean isGameOver() {
        return gameOver;
    }
    
    public boolean isWon() {
        return won;
    }
    
    public GameState getGameState() {
        return new GameState(
            getMaskedWord(),
            wrongGuesses,
            getRemainingGuesses(),
            guessedLetters,
            guessedWords,
            gameOver,
            won,
            gameOver ? secretWord : null
        );
    }
}