import WithActiveFlag from './WithActiveFlag';



function NewToggle (props:any){
  return (
    <div 
      className={`Toggle ${props.isActive ?`ToggleActive` :`ToggleDisActive`}`}
      onClick = {props.changeActive}
     >
    {props.children}
  </div>
  )
}


export default WithActiveFlag ( NewToggle );
