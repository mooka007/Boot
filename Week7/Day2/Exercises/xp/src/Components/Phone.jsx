import React, { useState } from 'react';

function Phone() {
  const [brand] = useState("Samsung");
  const [model] = useState("Galaxy S20");
  const [color, setColor] = useState("black");
  const [year] = useState(2020);

  const changeColor = () => {
    setColor("blue");
  };

  return (
    <div>
      <h2> My Phone is a {brand}</h2>
      <p> it's a {color} {model} from {year}</p>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Phone;
