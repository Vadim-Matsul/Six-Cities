import WithActiveFlag from "./WithActiveFlag";

type TProps = {
    placeholder?: string
    isActive: boolean
    changeActive: () => void
}

function NewInputHelp (props: TProps) {
    console.log(props);
    
  return (
    <>
    <input
      placeholder={ props.placeholder || 'Подсказка'}
      className={'InputHelp'}
      onFocus = {props.changeActive}
      onBlur = {props.changeActive}
    />
    { props.isActive &&
      <span> Введите Текст </span>
    }      
    </>
  )
}


export default WithActiveFlag (  NewInputHelp );
