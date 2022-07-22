import { PureComponent } from 'react';

export class ClassesComponent extends PureComponent {
  constructor (props:any) {
    super (props);
    this.state = {
      date: new Date().toLocaleTimeString()
    };
  }

  timer (){
    this.setState({
      date: new Date().toLocaleTimeString() 
    })
  }

  render() {
    setInterval(this.timer.bind(this), 1000)
    return (
      <div>
        <label>Текущее время: {this.state.date}</label>
      </div>
    );
  }
}
