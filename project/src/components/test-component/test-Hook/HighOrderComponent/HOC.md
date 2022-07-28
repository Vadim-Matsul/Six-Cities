import React from 'react';

type TProps = {
    [key:string]:string
}

export type THOCState = {
    isActive: boolean
    changeActive?: () => void
}

function HOC (Component:React.FunctionComponent <THOCState>){
  return class extends React.Component <TProps, THOCState>{
    constructor (props: TProps){
      super (props)
      this.state = {
        isActive: false
      }
      this.handlerBoolean = this.handlerBoolean.bind( this )
    }

    handlerBoolean(){
      this.setState((prevState) => ({isActive: !prevState.isActive}))
    }

    render(): JSX.Element {
      return (
      <Component 
        {...this.props}
        isActive = { this.state.isActive }
        changeActive = { this.handlerBoolean }
      />
      )
    }
  }
}


export default HOC;
