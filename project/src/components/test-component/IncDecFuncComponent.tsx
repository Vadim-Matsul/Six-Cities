import { useState } from 'react';

function IncDecFuncComponent ():JSX.Element{
  const [incCounter, setIncCounter] = useState({
    count: 0,
    incCount: 0
  });

  return (
    <>
      <h2>{incCounter.count}</h2>
      <button
        onClick={() => {
          setIncCounter((prevState) => ({
            ...prevState,
            count: prevState.count + 1,
            incCount: prevState.incCount + 1
          }));
          setIncCounter((prevState) => ({
            ...prevState,
            count: prevState.count + 1
          }));
        }}
      > INC + 2 <br/>{incCounter.incCount} taps
      </button>
      <button onClick={() => setIncCounter(
        {...incCounter,
          count: incCounter.count - 1 }
      )}
      > DEC
      </button>
    </>
  );
}


export default IncDecFuncComponent;
