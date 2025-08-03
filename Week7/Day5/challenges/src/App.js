import React, { useState } from 'react';
import './App.css';

function App() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAddition = () => {
    // Convert strings to numbers and add them
    const num1 = parseFloat(firstNumber) || 0;
    const num2 = parseFloat(secondNumber) || 0;
    const sum = num1 + num2;
    
    setResult(sum);
    setShowResult(true);
  };

  const handleReset = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult(null);
    setShowResult(false);
  };

  const handleFirstNumberChange = (e) => {
    setFirstNumber(e.target.value);
    if (showResult) {
      setShowResult(false);
    }
  };

  const handleSecondNumberChange = (e) => {
    setSecondNumber(e.target.value);
    if (showResult) {
      setShowResult(false);
    }
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <h1 className="title">Adding Two Numbers</h1>
        
        <div className="input-section">
          <div className="input-group">
            <input
              type="number"
              value={firstNumber}
              onChange={handleFirstNumberChange}
              placeholder="Enter first number"
              className="number-input"
            />
          </div>
          
          <div className="plus-sign">+</div>
          
          <div className="input-group">
            <input
              type="number"
              value={secondNumber}
              onChange={handleSecondNumberChange}
              placeholder="Enter second number"
              className="number-input"
            />
          </div>
        </div>

        <div className="button-section">
          <button 
            onClick={handleAddition} 
            className="add-button"
            disabled={!firstNumber && !secondNumber}
          >
            Add Them!
          </button>
          
          <button 
            onClick={handleReset} 
            className="reset-button"
          >
            Reset
          </button>
        </div>

        {showResult && (
          <div className="result-section">
            <div className="result-display">
              {result}
            </div>
            <p className="result-text">
              {firstNumber || 0} + {secondNumber || 0} = {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
