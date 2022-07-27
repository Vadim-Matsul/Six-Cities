import React from 'react';

type TProps = {
    [key:string]:string
}
type TState = {
    isActive:boolean
}

export class InputHelp extends React.PureComponent <TProps, TState>{
  constructor(props:TProps){
    super(props)
    this.state = {
      isActive: false
    }
    this.ShowHelp = this.ShowHelp.bind( this )
    this.HideHelp = this.HideHelp.bind( this )
  }
  
  ShowHelp () {
    this.setState((prevState) => ({isActive: !prevState.isActive}))
  }

  HideHelp () {
    this.setState((prevState) => ({isActive: !prevState.isActive}))
  }  

  render(): React.ReactNode {
    return (
      <>
      <input
        className={'InputHelp'}
        onFocus = {this.ShowHelp}
        onBlur = {this.HideHelp}
      />
      { this.state.isActive &&
        <span> Введите Текст </span>
      }      
      </>

      
    )
  }
}