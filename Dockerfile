FROM maven:3.9.11-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd -r hangman && useradd -r -g hangman hangman

# Set working directory
WORKDIR /app

# Copy the built WAR file
COPY --from=build /app/target/hangman.war ./hangman.war

# Copy Jetty runner
ADD https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.4.51.v20230217/jetty-runner-9.4.51.v20230217.jar ./jetty-runner.jar

# Change ownership
RUN chown -R hangman:hangman /app

# Switch to app user
USER hangman

# Expose port
EXPOSE 7583

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:7583/ || exit 1

# Run the application
CMD ["java", "-jar", "jetty-runner.jar", "--port", "7583", "hangman.war"]