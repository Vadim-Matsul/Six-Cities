import { Component, ReactNode } from 'react';

type TProps = {
  message?: boolean
  onClick?: () => any
}
type TState = {
  [key:string]:boolean   
}

export class OneMoreTest extends Component <TProps, TState> {
  constructor (props: TProps){
    super(props)
    this.state = {
      message: false
    }
    this.handlerMessage = this.handlerMessage.bind( this )
  }

  handlerMessage(){
    this.setState((prevState) => ({message: !prevState.message}))
  }

  render(): ReactNode {
      return <Message message={this.state.message} onClick = { this.handlerMessage} />
  }
}

class Message extends Component  <TProps>{
  shouldComponentUpdate(){
    console.log('остановка лавины');
    
    return false
  }

  render(){
    return <Text message = {this.props.message} onClick = {this.props.onClick}/>
  }
}

function Text (props: TProps){
    const { message,  onClick } = props
  return(
    <div onClick={onClick} >
      {message 
        ? <p> Открой меня </p>
        : <p> Спрячь меня </p>
      }
    </div>

  )
}