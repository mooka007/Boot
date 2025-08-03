import React, {useState} from 'react'
import Garage from './Garage';

function Car({model}) {

    const [color, setColor] = useState("red");

  return (
    <>
        <h1> This car is {color} {model}. </h1>
        <Garage size="small" />
    </>
  )
}

export default Car
