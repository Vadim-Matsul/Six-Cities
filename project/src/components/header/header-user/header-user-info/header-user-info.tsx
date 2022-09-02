import React from 'react';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../../../store/reducer/data-reducer/selectors';
import { getUser } from '../../../../store/reducer/user-reducer/selectors';


const HeaderUserInfo:React.FC = () => {
  const user = useSelector ( getUser );
  const { data } = useSelector( getFavorites );

  return (
    <>
      <div className='header__avatar-wrapper user__avatar-wrapper'/>
      <span className='header__user-name user__name'>{ user?.name }</span>
      <span className='header__favorite-count'>{ data.length }</span>
    </>
  );
};

export default React.memo(HeaderUserInfo);
