import React, { useState, useEffect } from 'react';

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
    setFavoriteColor("yellow");
  }, []);

  const changeColor = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h1>
        My Favorite Color is <span style={{ fontStyle: "italic" }}>{favoriteColor}</span>
      </h1>
      <button onClick={changeColor}>Change to Blue</button>
    </div>
  );
}

export default Color;
