import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useEffect } from 'react';

import { AuthData, loginSession, ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { getLoginError } from '../../../store/reducer/user-reducer/selectors';
import { SetloginError } from '../../../store/actions/actions';
import { MessageConfig, Pattern } from '../../../const';
import { useDispatch, useSelector } from 'react-redux';
import { useTimeout } from '../../../hooks/useTimeout';

import MessageError from '../../message-error/message-error';


type HandleSubmitType = ( data: AuthData ) => void;


const AuthScreenRegistrationForm:React.FC = () => {

  const dispatch = useDispatch() as ThunkDispatchResualt;
  const loginError = useSelector( getLoginError );

  useTimeout(loginError, SetloginError, 3000);

  const buttonClass = classNames('login__submit form__submit button', {
    'horizontal-shake login__submit__error' : loginError
  });


  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState:{ errors, isValid, isSubmitting }
  } = useForm< AuthData >( { mode: 'onChange' } );

  useEffect( () => setFocus('email'), [setFocus] );
  const textButton = isSubmitting ? 'Pending...' : 'Sign in';

  const registerForEmail = {
    ...register('email', {
      required: MessageConfig.required,
      pattern:{
        value: Pattern.Email,
        message: MessageConfig.patternEmail
      }
    })};

  const registerForPassword = {
    ...register('password', {
      required: MessageConfig.required,
      pattern: {
        value: Pattern.Password,
        message: MessageConfig.patternPassword
      },
      minLength:{
        value: 8,
        message: MessageConfig.minLengthPassword
      }
    })};

  const HandleSubmit:HandleSubmitType = async ( data ) => {
    await dispatch( loginSession( data ) );
    reset();
  };


  return (
    <form
      className='login__form form'
      action='#'
      method='post'
      onSubmit={ handleSubmit( HandleSubmit ) }
    >
      <div className='login__input-wrapper form__input-wrapper'>
        <label className='visually-hidden'>E-mail</label>
        <input
          className='login__input form__input'
          type='email'
          placeholder='Email'
          data-testid = 'login'
          role={'form'}
          {...registerForEmail}
        />
        { errors.email && <MessageError isAuthScreen message={ errors.email.message }/> }
      </div>
      <div className='login__input-wrapper form__input-wrapper'>
        <label className='visually-hidden'>Password</label>
        <input
          className='login__input form__input'
          type='password'
          placeholder='Password'
          data-testid = 'password'
          role={'form'}
          {...registerForPassword}
        />
        { errors.password && <MessageError isAuthScreen message={ errors.password.message }/> }
      </div>
      <button
        className={ buttonClass }
        type='submit'
        data-testid = 'auth-button'
        disabled={ !isValid }
      > { textButton }
      </button>
    </form>
  );
};

export default AuthScreenRegistrationForm;
