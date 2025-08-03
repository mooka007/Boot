import './App.css';
import Exercise3 from './Exercise3';
import UserFavoriteAnimals from './UserFavoriteAnimals';

function App() {

  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals : ['Horse','Turtle','Elephant','Monkey']
  };
  const animals = ["Kalb", "Far5", "Djaja"];

  return (
    <div>
      <p> Hello Wrold </p>
      {myelement}
      <p> React is {sum} times better with JSX </p>
      <h3> {user.firstName} </h3>
      <h3> {user.lastName} </h3>
      <UserFavoriteAnimals favAnimals={animals} />
      <Exercise3 />

    </div>
  );
}

export default App;
