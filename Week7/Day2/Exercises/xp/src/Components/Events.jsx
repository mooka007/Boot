import React, {useState} from 'react'

const clickMe = () => {
    alert("I was clicked")
}

const handleKeyDown = (e) => {

  if (e.key === "Enter") {
    alert("The enter key was pressed, your input value is: " + e.target.value);
  }
  
}
function Events() {

  const [isToggleOn, setisToggleOn] = useState(true);

  return (
    <div>
      <button onClick={clickMe} > Click me </button>
      <input placeholder="Press the Enter key" onKeyDown={handleKeyDown}/>
      <button onClick={() => setisToggleOn(!isToggleOn)}>
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  )
}

export default Events
