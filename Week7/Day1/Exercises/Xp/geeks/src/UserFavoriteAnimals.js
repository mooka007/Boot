import React from 'react'

function UserFavoriteAnimals({favAnimals}) {
  return (
    <div>
      <ul>
        {favAnimals.map((animal, key)=>{
            return(
                <li key={key} > {animal} </li>
            )
        })}
      </ul>
    </div>
  )
}

export default UserFavoriteAnimals
