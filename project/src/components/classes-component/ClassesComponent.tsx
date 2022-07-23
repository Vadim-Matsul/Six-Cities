import { PureComponent, ReactNode } from 'react';
type TProps = {
  [key: string]:string
}
type TState = {
  date: string
}

export class ClassesComponent extends PureComponent <TProps, TState> {
  constructor (props: TProps){
    super (props);
    this.state = {
      date: '00:00:00',
    };
    this.timer = this.timer.bind(this);
    this.newTest = this.newTest.bind(this);
  }

  componentDidMount(){
    this.timerInt();
  }

  componentWillUnmount(){
    clearInterval(this.timerInt());
  }

  timer(){
    this.setState ({
      date: new Date().toLocaleTimeString()
    });
  }

  timerInt (){
    setInterval(this.timer, 1000);
    return undefined;
  }
  newTest () {
    this.setState((prevState, props) => ({
      date: prevState.date + 'fulfilled test'
    }), () => console.log(this.state.date)
    )
  }
  render(): ReactNode {
    return (
      <div>
        <h2>Сейчас: {this.state.date}</h2>
        <button onClick={this.newTest}>Test</button>
      </div>
    );
  }
}
