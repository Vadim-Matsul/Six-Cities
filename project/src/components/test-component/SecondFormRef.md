import React from "react";


type TSecondFormRef = {
  email?: string
}

function SecondFormRef  (props:TSecondFormRef)  {
 
  const FormRef: React.RefObject <HTMLFormElement> = React.createRef();

  const handlerSubmitForm = (event:any) => {
    event.preventDefault();
    let emailVariable = new FormData(FormRef.current!).get('comment');
    console.log(emailVariable);
  }

  return (
    <form 
      ref={FormRef}
      onSubmit = { handlerSubmitForm }
    >
      <label>Введите почту</label>
      <input 
        type='email'
        name='email'
        defaultValue={props.email || 'youremail@gmail.com'}
      />
      <input 
        type='text'
        name='comment'
        defaultValue={props.email || 'yourText'}
      />
      <button>Submit</button>
    </form>
  );
}


export default  SecondFormRef;
