import React from 'react';
type TProps = {
    email: string
  }

function FormCreateRef (props: TProps):JSX.Element {
  const InputRef:React.RefObject<HTMLFormElement> = React.createRef();

  console.log('До взаимодействия',InputRef.current);

  const handlerEmail = (event: any) => {
    event.preventDefault();
    console.log('Данные формы', new FormData(InputRef.current!).get('email'));
    console.log(InputRef.current);
  };

  return (
    <form
      onSubmit={handlerEmail}
      ref = {InputRef}
    >
      <label htmlFor='email'>Введите email</label>
      <input
        type='email'
        name='email'
        defaultValue={props.email || 'null'}
      />
      <button type='submit'> submit </button>
    </form>
  );
}


export default FormCreateRef;
