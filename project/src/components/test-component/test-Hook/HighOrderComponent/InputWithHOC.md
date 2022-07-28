import { THOCState } from './HOC';
import HOC from './HOC'


function InputWithHOC (props: THOCState):JSX.Element {
  return (
    <>
      <input
        type='text'
        onFocus={props.changeActive}
        onBlur = {props.changeActive}
      />
      { props.isActive &&
        <span> Подсказка </span>
      }
    </>
  )
}


export default HOC (InputWithHOC);
