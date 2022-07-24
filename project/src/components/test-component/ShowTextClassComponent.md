import { PureComponent, ReactNode} from 'react';
type TProps = {
    [key:string]:string | boolean
}
type TState = {
    textShow: boolean
}
export class ShowTextClassComponent extends PureComponent <TProps, TState> {
  constructor (props: TProps){
    super(props);
    this.state = {
      textShow: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    this.setState( (prevState) => ({
      textShow: !prevState.textShow
    }));
  }

  render():ReactNode{
    return (
      <div onClick={this.clickHandler}>
        <p>Показать текст?</p>
        {this.state.textShow &&
          <h2>Давай меня спрячем! Кликни</h2>}
      </div>
    );
  }
}
