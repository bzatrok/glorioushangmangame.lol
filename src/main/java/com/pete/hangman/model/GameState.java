package com.pete.hangman.model;

import java.util.Set;

public class GameState {
    private final String maskedWord;
    private final int wrongGuesses;
    private final int remainingGuesses;
    private final Set<Character> guessedLetters;
    private final Set<String> guessedWords;
    private final boolean gameOver;
    private final boolean won;
    private final String secretWord;
    
    public GameState(String maskedWord, int wrongGuesses, int remainingGuesses,
                    Set<Character> guessedLetters, Set<String> guessedWords,
                    boolean gameOver, boolean won, String secretWord) {
        this.maskedWord = maskedWord;
        this.wrongGuesses = wrongGuesses;
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = guessedLetters;
        this.guessedWords = guessedWords;
        this.gameOver = gameOver;
        this.won = won;
        this.secretWord = secretWord;
    }
    
    public String getMaskedWord() {
        return maskedWord;
    }
    
    public int getWrongGuesses() {
        return wrongGuesses;
    }
    
    public int getRemainingGuesses() {
        return remainingGuesses;
    }
    
    public Set<Character> getGuessedLetters() {
        return guessedLetters;
    }
    
    public Set<String> getGuessedWords() {
        return guessedWords;
    }
    
    public boolean isGameOver() {
        return gameOver;
    }
    
    public boolean isWon() {
        return won;
    }
    
    public String getSecretWord() {
        return secretWord;
    }
}