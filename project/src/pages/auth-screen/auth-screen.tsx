import React, { ChangeEvent, FormEvent, RefObject, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { ChangeCurrentCity } from '../../store/actions/actions';
import { AuthData, loginSession, ThunkDispatchResualt } from '../../store/actions/api-actions';
import { getRandomCity } from '../../utils/utils';


function AuthScreen ():JSX.Element {
  const dispatch = useDispatch() as ThunkDispatchResualt;
  const loginRef:RefObject<HTMLInputElement> = useRef(null);
  const passwordRef:RefObject<HTMLInputElement> = useRef(null);

  const randomCity = getRandomCity();

  function handlerSubmit (event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null){
      const userData:AuthData = {
        email: loginRef.current.value,
        password: passwordRef.current.value
      };
      dispatch(loginSession(userData));
    }
  }

  function passwordValidate ({target}: ChangeEvent<HTMLInputElement>){
    const validate = /\s/g.test(target.value) ? 'Пробелы не допускаются' : '' ;
    target.setCustomValidity(validate);
    target.reportValidity();
  }

  return (
    <div className='page page--gray page--login'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              className='login__form form'
              action='#'
              method='post'
              onSubmit={ handlerSubmit }
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  ref={ loginRef }
                  required
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  ref={ passwordRef }
                  onChange={ (el) => passwordValidate(el) }
                  required
                />
              </div>
              <button className='login__submit form__submit button' type='submit'>Sign in</button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link
                className='locations__item-link'
                to={ AppRoute.Main }
                onClick={ () => dispatch(ChangeCurrentCity(randomCity)) }
              >
                <span>{ randomCity }</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


export default AuthScreen;
