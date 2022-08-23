import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type AuthScreenCityProps = {
  onClick: () => void,
  randomCity: string
}

const AuthScreenCity = ({ onClick, randomCity }:AuthScreenCityProps):JSX.Element => (
  <section className='locations locations--login locations--current'>
    <div className='locations__item'>
      <Link
        className='locations__item-link'
        to={ AppRoute.Main }
        onClick={ onClick }
        data-testid='AuthScreenCity'
      >
        <span>{ randomCity }</span>
      </Link>
    </div>
  </section>
);

export default AuthScreenCity;
