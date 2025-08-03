import React from 'react';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';
import ColorChanger from './ColorChange';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true
    };
  }

  deleteHeader = () => {
    this.setState({ showHeader: false });
  };

  render() {
    return (
      <div className="App">
        {/* Unmounting Phase Demo */}
        {this.state.showHeader && <Header />}
        <button onClick={this.deleteHeader}>Delete Header</button>
        <hr />

        {/* Existing Simulations */}
        <h2>Simulation 1: Two counters in one error boundary</h2>
        <p>Click on the numbers to increase the counters.</p>
        <p>The counter is programmed to throw error when it reaches 5.</p>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
        <hr />

        <h2>Simulation 2: Two counters, each in their own error boundary</h2>
        <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        <hr />

        <h2>Simulation 3: Counter without error boundary</h2>
        <p>This counter is not inside of boundary. So if crashes, all other components are deleted.</p>
        <BuggyCounter />
        <hr />

        <ColorChanger />
      </div>
    );
  }
}

class Header extends React.Component {
  componentWillUnmount() {
    alert('The component named Header is about to be unmounted.');
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

export default App;