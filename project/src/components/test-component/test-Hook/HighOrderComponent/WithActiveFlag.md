import React from 'react';

type TProps = {
    [key:string]:string
}
type TState = {
    isActive: boolean
}


function WithActiveFlag (Component: any){
  return class extends React.PureComponent <TProps, TState>{
    constructor(props:TProps){
    super(props)
    this.state = {
      isActive: false
    }
    this.handlderActiveFlag = this.handlderActiveFlag.bind( this )
    }
    
    handlderActiveFlag (){
        this.setState((prevState) => ({isActive: !prevState.isActive}))
    }

    render(): JSX.Element {
      return <Component
               {...this.props}
               isActive = { this.state.isActive }
               changeActive = { this.handlderActiveFlag }
             />
    }
  }
}


export default WithActiveFlag;
