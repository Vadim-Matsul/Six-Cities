import React from 'react';

type TProps = {
  [key: string]:string
}
type TState = {
  [key: string]:string  
}
export class ClassCompForm extends React.PureComponent <TProps, TState>{
  constructor(props: TProps){
    super(props)
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        comment: ''
    }
    this.formsubmit = this.formsubmit.bind( this )
    this.handlerFieldForm = this.handlerFieldForm.bind( this )
  }

  formsubmit = (event:any) => {
    event.preventDefault()
    console.log(this);
    
    alert('Form was submit')
  }

  handlerFieldForm (event:any){
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  render(): JSX.Element {
    const {firstname, lastname, email, comment} = this.state
    return(
      <>
        <form onSubmit={this.formsubmit}>
          <label htmlFor='firstname'>Имя</label>
          <input 
            id='firstname'
            name='firstname'            
            onChange={this.handlerFieldForm}/>
          <label htmlFor='lastname'>Фамилия</label>
          <input 
            id='lastname'
            name='lastname'            
            onChange={this.handlerFieldForm}/>
          <label htmlFor='email'>Email</label>
          <input 
            id='email'
            name='email'
            onChange={this.handlerFieldForm}/>
          <label htmlFor='comment'>Комментарий</label>
          <textarea 
            id='comment'
            name='comment'
            onChange={this.handlerFieldForm}/>
          <button type='submit'>
            Отправить
          </button>
        </form> 
        <h2>
          firstname: {firstname} lastname: {lastname} email: {email} comment: {comment}
        </h2>
      </>
    )
     
  }
}