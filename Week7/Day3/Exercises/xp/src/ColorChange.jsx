import React from 'react';

class ColorChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: 'red',
      previousColor: null
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 1000);
  }

  shouldComponentUpdate() {
    return true; // Change to false to test Part I behavior
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('in getSnapshotBeforeUpdate');
    return prevState.favoriteColor;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('after update');
    console.log('Previous color was:', snapshot);
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' });
  };

  render() {
    return (
      <div>
        <h1>My favourite color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeColor}>Change color to blue</button>
      </div>
    );
  }
}

export default ColorChanger;