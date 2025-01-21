# multiplayer Unicode App
**Video :-** The video showcases a 10x10 grid UI, displaying the number of users online and real-time grid updates. It demonstrates how users can enter Unicode characters, with a brief block on their input for 1 minute after each submission. Once the block period ends, the user is able to update the grid again.

[Watch the video](https://1drv.ms/v/c/995ef548607f74fd/EUnJ3ePiUBBNptASw3_kRZQBI2y398EY661mg07azHt2kA)



# About This Project
- **10x10 Grid UI:** Players can select and update a block with a Unicode character.

- **Player Input Restrictions:** After submitting a character in a block, the player is        temporarily blocked from updating the grid again for 1 minute.

- **Real-time Grid Updates:** The grid updates in real-time, allowing all connected players to see changes as they happen.

- **Online Player Count:** The number of players currently online is displayed and updated in real-time.


# Setup Instructions

## 1. Install Dependencies
Run `npm install` in the following directories:
- `./server`
- `./client`

## 2. Start Server

Navigate to ./server and run:

- `npm start`

## 3. Start Frontend

Navigate to ./client and run:

- `npm start`

# Architecture

## 1) WebSocket Connection

The application uses the ws library to establish a persistent, real-time WebSocket connection between the server and client. This enables seamless communication, ensuring the grid updates in real-time for all connected players. With WebSockets, any changes to the grid—such as updates to the blocks—are instantly reflected across all users without requiring constant page refreshes. Additionally, the WebSocket connection allows for live updates of the player count as users join or leave the application.


## 2) Front-end with React

The front-end of the application is built using **React**, a JavaScript library for building user interfaces. React's component-based architecture allows for efficient rendering and real-time updates, making it an ideal choice for this project. The 10x10 grid UI is dynamically managed with React components, and state updates are handled efficiently to ensure that changes to the grid are reflected instantly. React's hooks and state management also facilitate smooth interaction with the WebSocket server, enabling real-time synchronization of the grid and online player count.

## 3) Backend Overview

The backend of the application is built using Express.js and JavaScript. Express.js handles routing and HTTP requests, while JavaScript enables server-side logic, including real-time communication via WebSockets. This combination provides a fast, scalable backend for managing user interactions and ensuring seamless updates across all connected players.