# Cute Animal Collection Pinterest Style

## Overview

This application allows you add cute animals images.

Features:

1. As an unauthenticated user, I can login with Twitter.

2. As an authenticated user, I can link to images.

3. As an authenticated user, I can delete images that I've linked to.

4. As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.

5. As an unauthenticated user, I can browse other users' walls of images.


# Quick Start Guide

### Prerequisites

You must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup


### Setup Twitter Authentication

Pleas register the application with Twitter (https://apps.twitter.com) and get API keys / secrets.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
TWITTER_KEY=your-twitter-key-here
TWITTER_SECRET=your-twitter-secret-here
MONGO_URI=mongodb://localhost:27017/cuterest
APP_URL=https://book-trading-club-pytong.c9.io/
PORT=8080
```

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!


## License

MIT License. [Click here for more information.](LICENSE.md)
