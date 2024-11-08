# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app/server

# Install gcc, libsqlite3-dev, and other necessary build tools
RUN apt-get update && apt-get install -y gcc libsqlite3-dev

# Copy the requirements.txt file into the container
COPY requirements.txt requirements.txt

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the Flask app runs on
EXPOSE 8080

# Run the Flask app
CMD ["python", "server.py"]
