import { PureComponent, ReactNode } from "react";

type TProps = {
  [key: string]:string
}
type TState = {
  date: string
}

export class ClassesComponent extends PureComponent <TProps, TState> {
  constructor (props: TProps){
    super (props)
    this.state = {
      date: '00:00:00'
    }
    this.timer = this.timer.bind(this)
  }

  timer(){
    this.setState ({
      date: new Date().toLocaleTimeString()
    }) 
    setInterval(this.timer, 1000)
  }

  render(): ReactNode {
    return (
      <div>
        <h2>Сейчас: {this.state.date}</h2>
        <button onClick={() => this.timer()}>Start Timer</button>
      </div>
    );
  }
}