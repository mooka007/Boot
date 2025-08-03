import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverMessage: '',
      inputValue: '',
      responseMessage: ''
    };
  }

  componentDidMount() {
    this.fetchHelloMessage();
  }

  fetchHelloMessage = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hello');
      this.setState({ serverMessage: response.data.message });
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/world', {
        post: this.state.inputValue
      });
      this.setState({ 
        responseMessage: response.data.message,
        inputValue: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.serverMessage}</h1>
        
        <form onSubmit={this.handleSubmit}>
          <h2>Post to Server:</h2>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Type something..."
          />
          <button type="submit">Submit</button>
        </form>
        
        {this.state.responseMessage && (
          <p>{this.state.responseMessage}</p>
        )}
      </div>
    );
  }
}

export default App;
