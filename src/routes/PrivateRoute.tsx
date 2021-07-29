import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps extends RouteProps {
  path: RouteProps['path'];
}
export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...routeProps }) => {
  const { currentUser } = useAuth();
  const ComponentToRender = Component as React.ElementType;
  return (
    <Route
      {...routeProps}
      render={(props) => (currentUser ? <ComponentToRender /> : <Redirect to="/login" {...props} />)}
    />
  );
};
