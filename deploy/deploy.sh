#!/bin/bash

# Soviet Hangman Deployment Script
# Deploy to production server at hangman.amberglass.co

set -e

echo "☭ STARTING SOVIET HANGMAN DEPLOYMENT ☭"

# Configuration
IMAGE_NAME="amberglass/hangman"
CONTAINER_NAME="hangman-game"
PORT="7583"
DEPLOY_DIR="/var/www/hangman.amberglass.co"

# Pull latest image
echo "☭ PULLING LATEST DOCKER IMAGE..."
docker pull ${IMAGE_NAME}:latest

# Stop and remove existing container if it exists
echo "☭ STOPPING EXISTING CONTAINER..."
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

# Create deployment directory if it doesn't exist
sudo mkdir -p ${DEPLOY_DIR}
cd ${DEPLOY_DIR}

# Run new container
echo "☭ STARTING NEW CONTAINER..."
docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${PORT}:${PORT} \
    --restart unless-stopped \
    ${IMAGE_NAME}:latest

# Wait for container to be healthy
echo "☭ WAITING FOR CONTAINER TO BE HEALTHY..."
sleep 10

# Check if container is running
if docker ps | grep -q ${CONTAINER_NAME}; then
    echo "☭ DEPLOYMENT SUCCESSFUL! GAME RUNNING ON PORT ${PORT} ☭"
    echo "☭ ACCESS AT: http://hangman.amberglass.co:${PORT} ☭"
else
    echo "☭ DEPLOYMENT FAILED! CONTAINER NOT RUNNING ☭"
    exit 1
fi

echo "☭ SLAVA SOVIET HANGMAN GAME! ☭"