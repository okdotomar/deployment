# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app/client

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages
RUN npm install

RUN npm install -g http-server

# Make port 3000 available to the world outside this container
EXPOSE 8081

# Run the app when the container launches
CMD ["http-server", ".", "-p", "8081"]
