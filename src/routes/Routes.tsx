import { Signup } from '../pages/Signup';
import { Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';
import { ForgotPassword } from '../pages/ForgotPassword';
import { UpdateProfile } from '../pages/UpdateProfile';
import { NewSale } from '../pages/NewSale';
import Loading from '../components/common/Loading';

function Routes() {
  return (
    <>
      <Loading />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
      <PrivateRoute exact path="/new-sale" component={NewSale} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
    </>
  );
}

export default Routes;
