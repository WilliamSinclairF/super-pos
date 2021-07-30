import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import AppNotificationsProvider from '../context/AppNotificationsContext';

import { Signup } from '../pages/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';
import { ForgotPassword } from '../pages/ForgotPassword';
import { UpdateProfile } from '../pages/UpdateProfile';
import { StoreProvider } from '../context/StoreContext';
import { NewSale } from '../pages/NewSale';
import { Navbar } from '../components/common/Navbar';
import { Notifications } from '../components/common/Notifications';

function Routes() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppNotificationsProvider>
          <Navbar />
          <Notifications />
          <Container style={{ minHeight: '100vh' }} className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '400px' }}>
              <Router>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                  <PrivateRoute exact path="/new-sale" component={NewSale} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </Router>
            </div>
          </Container>
        </AppNotificationsProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default Routes;
