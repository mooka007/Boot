import React, { Component } from 'react';
import FormComponent from './FormComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      destination: '',
      nutsFree: false,
      lactoseFree: false,
      vegan: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === 'checkbox' 
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const queryParams = new URLSearchParams();
    
    // Add all form data to URL params
    Object.entries(this.state).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    // Update URL without page reload
    window.history.pushState(null, '', `/?${queryParams.toString()}`);
  }

  render() {
    return (
      <div className="app">
        <FormComponent 
          data={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;