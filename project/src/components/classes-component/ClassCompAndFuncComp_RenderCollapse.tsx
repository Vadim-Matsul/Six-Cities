import { Component, ReactNode } from 'react';
type TProps = {
  [key: string]:any
}
type TState = {
  message:string
}

export class ClassCompAndFuncCompRenderCollapse extends Component <TProps, TState>{
  constructor (props: TProps){
    super(props);
    this.state = {
      message: 'Hello TSX! My brain adores you'
    };
    this.hadlerMessage = this.hadlerMessage.bind( this );
  }

  hadlerMessage (){
    this.setState({message: 'Bye Bye ...'});
  }

  render(): JSX.Element {
    return (
      <Message message={this.state.message} onClick={this.hadlerMessage}/>
    );
  }
}

class Message extends Component <TProps, TState>{
  shouldComponentUpdate(){
    return false;
  }

  render(): ReactNode {
    return (
      <Text message={this.props.message} onClick={this.props.onClick}/>
    );
  }
}

function Text (props:TProps):JSX.Element {
  return (
    <div className={'Test-ClassCompAndFuncCompRenderCollapse'}>
      <p>При клике ничего не произойдёт</p>
      <p onClick={props.onClick}>{props.message}</p>
    </div>
  );
}
