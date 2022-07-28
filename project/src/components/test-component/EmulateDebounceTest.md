import { ObjectHTMLAttributes, useCallback, useRef, useState } from 'react';
import React from 'react';

function EmulateDebounceTest ():JSX.Element {
  const [query, setQuery] = useState('')
  const [ response, setResponse] = useState ('')

  const timer: {current: NodeJS.Timeout | undefined} = useRef () 


  const debounce = useCallback ((query:string) => {

    if (timer.current) clearTimeout(timer.current)
    
     timer.current = setTimeout(() => {
        fetch(`http::/SomethingSite/${query}`)
        setResponse( query )
     },1000)
     
  }, [query])


    return(
      <>
        <div>
           <input 
             value = { query }  
             onChange = {el => {
                setQuery(el.target.value)
                debounce(el.target.value)
            }}
           />
           { response &&
            <span>Отправили запрос:{response}</span> }
        </div>
      </>
    );
  }
  
  export default EmulateDebounceTest;