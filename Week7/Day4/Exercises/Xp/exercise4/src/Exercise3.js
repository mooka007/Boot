import React from "react";
import logo from "./logo.svg";
import "./Exercise.css";

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

function Exercise3() {
  return (
    <div>
      <h1 style={style_header}> Head </h1>
      <p className="para"> Paragraphe </p>
      <a href="https://github.com/mooka007"> Link </a>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <img src={logo} alt="react" />
      <ul>
        {" "}
        This is a list
        <li> Coffe </li>
        <li> Tea </li>
        <li> Milk </li>
      </ul>
    </div>
  );
}

export default Exercise3;
