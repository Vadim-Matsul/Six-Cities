import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute (props:PrivateRouteProps):JSX.Element {
  console.log(props);
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.NoLoged}/>
  );
}


export default PrivateRoute;
