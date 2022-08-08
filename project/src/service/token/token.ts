const STORAGE_JWT_KEY = 'six-cities';
type Token = string;

const getToken = ():Token => {
  const token = localStorage.getItem(STORAGE_JWT_KEY)
  return token ?? ''
};

const saveToken = (token: Token):void => {
  localStorage.setItem( STORAGE_JWT_KEY, token )
};

const dropToken = () => {
  localStorage.removeItem( STORAGE_JWT_KEY )
};


export { getToken, saveToken, dropToken };
