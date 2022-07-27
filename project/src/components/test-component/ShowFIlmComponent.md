import { useEffect, useState } from "react";
import FilmComponent from "./FilmComponent";

function ShowFilmComponent () {
  const [visible, setVisible] = useState(true)
  
  useEffect(() => {
    console.log('hello uE');
    
  document.addEventListener('keydown',keyDownEsc)

    function keyDownEsc (event:KeyboardEvent) {
        console.log(event);
      if (event.key === 'Escape' ){
        setVisible((prevBool) => !prevBool )
      }
    }
    return () => {
        console.log('remove');
     document.removeEventListener('keydown',keyDownEsc);
    }
  }, [visible])



  return (
    <>
      <button
        onClick={() => setVisible((prevBoolean) => !prevBoolean)}
      >
        { visible
          ? 'Скрыть'
          : 'Показать'
        }
      </button>
      {visible &&
      <FilmComponent />}
    </>
  );
}


export default ShowFilmComponent;