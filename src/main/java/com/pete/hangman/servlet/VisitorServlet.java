package com.pete.hangman.servlet;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@WebServlet("/api/visitors")
public class VisitorServlet extends HttpServlet {
    private static final AtomicLong visitorCount = new AtomicLong(1337);
    private final Gson gson = new Gson();
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        // Return current visitor count
        Map<String, Object> response = new HashMap<>();
        response.put("count", visitorCount.get());
        sendJsonResponse(resp, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        // Increment visitor count and return new count
        long newCount = visitorCount.incrementAndGet();
        
        Map<String, Object> response = new HashMap<>();
        response.put("count", newCount);
        response.put("message", "Welcome comrade #" + newCount);
        sendJsonResponse(resp, response);
    }
    
    private void sendJsonResponse(HttpServletResponse resp, Object data) 
            throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        
        PrintWriter out = resp.getWriter();
        out.print(gson.toJson(data));
        out.flush();
    }
}