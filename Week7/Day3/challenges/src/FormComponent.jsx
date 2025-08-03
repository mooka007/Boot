import React from 'react';
import "./FormComponent.css"

function FormComponent(props) {
  const { data, handleChange, handleSubmit } = props;
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sample form</h1>
        
        <label>
          <strong>First Name</strong>
          <input 
            type="text" 
            name="firstName" 
            value={data.firstName} 
            onChange={handleChange}
          />
        </label>
        
        <label>
          <strong>Last Name</strong>
          <input 
            type="text" 
            name="lastName" 
            value={data.lastName} 
            onChange={handleChange}
          />
        </label>
        
        <label>
          <strong>Age</strong>
          <input 
            type="number" 
            name="age" 
            value={data.age} 
            onChange={handleChange}
          />
        </label>
        
        <div className="gender-selection">
          <strong>Gender</strong>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={data.gender === 'male'} 
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={data.gender === 'female'} 
              onChange={handleChange}
            /> Female
          </label>
        </div>
        
        <label>
          <strong>Select your destination</strong>
          <select 
            name="destination" 
            value={data.destination} 
            onChange={handleChange}
          >
            <option value="">Please Choose a destination</option>
            <option value="Japan">Japan</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
          </select>
        </label>
        
        <div className="dietary-restrictions">
          <strong>Dietary restrictions:</strong>
          <label>
            <input 
              type="checkbox" 
              name="nutsFree" 
              checked={data.nutsFree} 
              onChange={handleChange}
            /> Nuts free
          </label>
          <label>
            <input 
              type="checkbox" 
              name="lactoseFree" 
              checked={data.lactoseFree} 
              onChange={handleChange}
            /> Lactose free
          </label>
          <label>
            <input 
              type="checkbox" 
              name="vegan" 
              checked={data.vegan} 
              onChange={handleChange}
            /> Vegan
          </label>
        </div>
        
        <button type="submit">Submit</button>
      </form>
      
      <div className="entered-info">
        <h2>Entered information:</h2>
        <p>Your name: {data.firstName} {data.lastName}</p>
        <p>Your age: {data.age}</p>
        <p>Your gender: {data.gender}</p>
        <p>Your destination: {data.destination}</p>
        <p>Your dietary restrictions:</p>
        <p>Nuts free: {data.nutsFree ? 'Yes' : 'No'}</p>
        <p>Lactose free: {data.lactoseFree ? 'Yes' : 'No'}</p>
        <p>Vegan meal: {data.vegan ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default FormComponent;