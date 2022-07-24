import React from 'react';
type TProps = {
    [key:string]:string
}
type TState = {
    [key:string]:number
}

export class IncDecClassComponent extends React.PureComponent <TProps, TState> {
  constructor (props: TProps){
    super (props);
    this.state = {
      count: 0
    };
  }

  incCount = () => {
    this.setState((prevState)=> ({count: prevState.count + 1}));
  };

  decCount = () => {
    this.setState((prevState)=> ({count: prevState.count - 1}));
  };

  render(): React.ReactNode {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.incCount}>INC</button>
        <button onClick={this.decCount}>DEC</button>
      </div>
    );
  }
}
