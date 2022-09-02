import { useDispatch } from 'react-redux';

import { ThunkDispatchResualt } from '../../store/actions/api-actions';
import { ChangeCurrentCity } from '../../store/actions/actions';
import { getRandomCity } from '../../utils/utils';

import Header from '../../components/header/header';
import AuthScreenCity from '../../components/auth-screen-components/auth-screen-city/auth-screen-city';
import AuthScreenRegistrationForm from '../../components/auth-screen-components/auth-screen-registration-form/auth-screen-registration-form';
import './auth-screen.css';


function AuthScreen ():JSX.Element {
  const dispatch = useDispatch() as ThunkDispatchResualt;

  const randomCity = getRandomCity();
  const changeCity = () => dispatch(ChangeCurrentCity(randomCity));


  return (
    <div
      className='page page--gray page--login'
      data-testid='AuthScreen'
    >
      <Header />
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <AuthScreenRegistrationForm />
          </section>
          <AuthScreenCity
            onClick={ changeCity }
            randomCity={ randomCity }
          />
        </div>
      </main>
    </div>
  );
}


export default AuthScreen;
