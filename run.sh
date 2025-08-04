#!/bin/bash

echo "Starting Pete's Beer Hangman Game..."
echo "The game will be available at http://localhost:7583"
echo "Press Ctrl+C to stop the server"
echo ""

mvn clean compile jetty:run