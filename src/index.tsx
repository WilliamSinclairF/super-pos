// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// COMPONENTS
import { Navbar } from './components/common/Navbar';
import { Notifications } from './components/common/Notifications';
import { Layout } from './components/common/Layout';
// CONTEXT
import AppNotificationsProvider from './context/AppNotificationsContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
// ROUTES
import Routes from './routes/Routes';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/loading.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <AppNotificationsProvider>
          <Router>
            <Navbar />
            <Notifications />
            <Switch>
              <Layout>
                <Routes />
              </Layout>
            </Switch>
          </Router>
        </AppNotificationsProvider>
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
