package com.pete.hangman.servlet;

import com.google.gson.Gson;
import com.pete.hangman.model.HangmanGame;
import com.pete.hangman.model.GameState;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/game/*")
public class GameServlet extends HttpServlet {
    private static final String GAME_SESSION_KEY = "hangmanGame";
    private final Gson gson = new Gson();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        
        if ("/state".equals(pathInfo)) {
            getGameState(req, resp);
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        
        if ("/new".equals(pathInfo)) {
            newGame(req, resp);
        } else if ("/guess".equals(pathInfo)) {
            makeGuess(req, resp);
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
    
    private void newGame(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
        HttpSession session = req.getSession();
        HangmanGame game = new HangmanGame();
        session.setAttribute(GAME_SESSION_KEY, game);
        
        sendJsonResponse(resp, game.getGameState());
    }
    
    private void getGameState(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
        HttpSession session = req.getSession();
        HangmanGame game = (HangmanGame) session.getAttribute(GAME_SESSION_KEY);
        
        if (game == null) {
            game = new HangmanGame();
            session.setAttribute(GAME_SESSION_KEY, game);
        }
        
        sendJsonResponse(resp, game.getGameState());
    }
    
    private void makeGuess(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException {
        HttpSession session = req.getSession();
        HangmanGame game = (HangmanGame) session.getAttribute(GAME_SESSION_KEY);
        
        if (game == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "No active game");
            return;
        }
        
        String guess = req.getParameter("guess");
        if (guess == null || guess.isEmpty()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "No guess provided");
            return;
        }
        
        Map<String, Object> response = new HashMap<>();
        boolean correct = false;
        String type = "";
        
        try {
            if (guess.length() == 1) {
                correct = game.guessLetter(guess.charAt(0));
                type = "letter";
            } else {
                correct = game.guessWord(guess);
                type = "word";
            }
            
            response.put("correct", correct);
            response.put("type", type);
            response.put("guess", guess.toUpperCase());
            response.put("gameState", game.getGameState());
            
            sendJsonResponse(resp, response);
        } catch (IllegalStateException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }
    
    private void sendJsonResponse(HttpServletResponse resp, Object data) 
            throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        // Prevent caching of game API responses
        resp.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        resp.setHeader("Pragma", "no-cache");
        resp.setHeader("Expires", "0");
        
        PrintWriter out = resp.getWriter();
        out.print(gson.toJson(data));
        out.flush();
    }
}