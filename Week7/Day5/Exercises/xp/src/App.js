import React, { useState, useEffect } from 'react';
import quotes from './quotes';
import './App.css';

function App() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [usedQuotes, setUsedQuotes] = useState([0]);
  const [backgroundColor, setBackgroundColor] = useState('#3498db');
  const [textColor, setTextColor] = useState('#2c3e50');
  const [buttonColor, setButtonColor] = useState('#e74c3c');

  // Array of beautiful colors
  const colors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#f1c40f',
    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
    '#f39c12', '#d35400', '#c0392b', '#7f8c8d', '#17a2b8',
    '#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#6610f2',
    '#dc3545', '#ffc107', '#28a745', '#007bff', '#6c757d'
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomQuote = () => {
    let availableQuotes = quotes.filter((_, index) => !usedQuotes.includes(index));
    
    // If all quotes have been used, reset and start over
    if (availableQuotes.length === 0) {
      setUsedQuotes([]);
      availableQuotes = quotes;
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    const originalIndex = quotes.indexOf(selectedQuote);

    setCurrentQuote(selectedQuote);
    setUsedQuotes(prev => [...prev, originalIndex]);

    // Change colors
    setBackgroundColor(getRandomColor());
    setTextColor(getRandomColor());
    setButtonColor(getRandomColor());
  };

  // Initialize with random quote on component mount
  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="app" style={{ backgroundColor: backgroundColor }}>
      <div className="quote-container">
        <div className="quote-box">
          <h1 className="quote-text" style={{ color: textColor }}>
            "{currentQuote.quote}"
          </h1>
          <p className="quote-author">
            {currentQuote.author ? `— ${currentQuote.author}` : '— Unknown'}
          </p>
          <button 
            className="new-quote-btn" 
            style={{ backgroundColor: buttonColor }}
            onClick={getRandomQuote}
          >
            New Quote
          </button>
        </div>
        
        <div className="quote-info">
          <p>Quotes used: {usedQuotes.length} / {quotes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
