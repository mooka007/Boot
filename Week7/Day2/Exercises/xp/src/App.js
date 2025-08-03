import './App.css';
import Car from './Components/Car';
import Color from './Components/Color';
import Events from './Components/Events';
import Phone from './Components/Phone';

const carinfo = {name: "Ford", model: "Mustang"};


function App() {
  return (
    <div className="App">
      <Car model={carinfo.model}/>
      <Events />
       <Phone />
       <Color />
    </div>
  );
}

export default App;
