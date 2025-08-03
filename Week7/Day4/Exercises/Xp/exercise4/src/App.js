import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      error: null
    };
  }

  sendData = async () => {
    const webhookUrl = 'https://webhook.site/4c873fd2-52de-4b28-a9de-cb8ebcd2dd67';
    const data = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27
    };

    try {
      // Using mode: 'no-cors' will give you an opaque response
      // Instead, we'll make a proper CORS request
      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors', // This is important
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Webhook.site doesn't actually return a response body,
      // so we'll just confirm the request was made
      console.log('Data sent successfully to webhook.site');
      this.setState({ 
        response: 'Data sent successfully. Check webhook.site for details.',
        error: null
      });
      
      // Open webhook.site in a new tab so you can see the request
      window.open(webhookUrl, '_blank');
      
    } catch (error) {
      console.error('Error sending data:', error);
      this.setState({ 
        error: 'Error sending data. See console for details.',
        response: null
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Webhook Test</h1>
        <button onClick={this.sendData}>Send Data to Webhook</button>
        
        {this.state.response && (
          <div className="response success">
            <p>{this.state.response}</p>
          </div>
        )}
        
        {this.state.error && (
          <div className="response error">
            <p>{this.state.error}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;