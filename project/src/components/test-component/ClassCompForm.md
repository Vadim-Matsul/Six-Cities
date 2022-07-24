import React from 'react';

type TProps = {
  [key:string]:string
}
type TState = {
  [key:string]:string
}
export class ClassCompForm extends React.PureComponent <TProps, TState>{
  constructor(props: TState){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      comment: ''
    };
    this.handlerFieldForm = this.handlerFieldForm.bind( this );
    this.handlerSubmitForm = this.handlerSubmitForm.bind( this );
  }

  handlerFieldForm(event: any){
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handlerSubmitForm (event:any){
    event.preventDefault();
  }

  render(): JSX.Element {
    return(
      <form onSubmit={this.handlerSubmitForm}>
        <label htmlFor='firstname'>ИМЯ</label>
        <input
          name='firstname'
          id='firstname'
          onChange={this.handlerFieldForm}
          value = {this.state.firstname}
        />
        <label htmlFor='lastname'>Фамилия</label>
        <input
          name='lastname'
          id='lastname'
          onChange={this.handlerFieldForm}
          value = {this.state.lastname}
        />
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          id='email'
          onChange={this.handlerFieldForm}
          value = {this.state.email}
        />
        <label htmlFor='comment'>Comment</label>
        <textarea
          name='comment'
          id='comment'
          onChange={this.handlerFieldForm}
          value = {this.state.comment}
        />
        <button type='submit'>Отправить</button>
      </form>
    );
  }
}
