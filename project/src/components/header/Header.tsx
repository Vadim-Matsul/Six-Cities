import Logo from './Logo';
import User from './User';

function Header (): JSX.Element {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo />
          <User />
        </div>
      </div>
    </header>
  );
}


export default Header;
