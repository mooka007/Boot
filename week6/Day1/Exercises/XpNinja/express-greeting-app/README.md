# Express.js Greeting App

A simple Express.js application that allows users to create personalized greetings with emojis.

## Features

- Form to enter name and select emoji
- Input validation
- Personalized greeting display
- Responsive design with beautiful styling
- Express Router implementation

## Available Emojis

😀 🎉 🌟 🎈 👋

## Installation

The setup script has already installed all dependencies. To start the application:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## Usage

1. Open your browser and go to http://localhost:3000
2. Enter your name in the form
3. Select your favorite emoji
4. Click "Get My Greeting!"
5. Enjoy your personalized greeting!

## Project Structure

```
express-greeting-app/
├── app.js              # Main application file
├── package.json        # Project dependencies
├── views/              # EJS templates
│   ├── index.ejs      # Form page
│   └── greeting.ejs   # Greeting display page
├── public/            # Static files
│   └── styles.css     # CSS styling
└── README.md          # This file
```
