import React from 'react';

type TProps = {
    [key:string]:string
}
type TState = {
    isActive:boolean
}

export class Toggle extends React.PureComponent <TProps, TState>{
  constructor(props:TProps){
    super(props)
    this.state = {
      isActive: true
    }
    this.ChangeActive = this.ChangeActive.bind( this )
  }
  
  ChangeActive () {
    this.setState((prevState) => ({isActive: !prevState.isActive}))
  }

  render(): React.ReactNode {
    return (
      <div 
        className={`Toggle ${this.state.isActive ?`ToggleActive` :`ToggleDisActive`}`}
        onClick = {this.ChangeActive}
      >
        {this.props.children}
      </div>
    )
  }
}