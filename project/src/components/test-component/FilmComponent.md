import React, { useState } from "react";

function FilmComponent () {
  const [id, setId] = useState(1)
  const [film, setFilm] = useState('')

  React.useEffect(() => {
    let needUpdate = true

    
    console.log(needUpdate);
    
    fetch(`https://5.react.pages.academy/wtw/films/${id}`)
      .then( response => response.json())
      .then( el => {needUpdate && setFilm(el.name)})

    return () => { needUpdate = false 
        console.log(needUpdate)
     }
  },[id])

  return (
    <>
      <button
      onClick={() => setId((prevID) => (prevID + 1))}
      >Следующий фильм</button>
      <h2>Текущий фильм: {id}</h2>
      <h1>{film}</h1>
    </>
)
  
}


export default FilmComponent;
