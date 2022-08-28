import { MutableRefObject, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MessageConfig, Pattern } from '../../../const';
import { AuthData, loginSession, ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { useDispatch, useSelector } from 'react-redux';
import MessageError from '../../message-error/message-error';
import { getLoginError } from '../../../store/reducer/user-reducer/selectors';
import classNames from 'classnames';
import { SetloginError } from '../../../store/actions/actions';

type HandleSubmitType = ( data: AuthData ) => void;


const AuthScreenRegistrationForm:React.FC = () => {

  const dispatch = useDispatch() as ThunkDispatchResualt;
  const timer:MutableRefObject< null | NodeJS.Timeout > = useRef( null );
  const loginError = useSelector( getLoginError );

  useEffect(() => {
    if (!timer.current && loginError ){
      timer.current = setTimeout(() => {
        dispatch( SetloginError(false) );
      }, 2000);
    }
    return () => {
      if(timer.current){
        clearTimeout( timer.current );
        timer.current = null;
      }};
  },[loginError, dispatch]);

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
