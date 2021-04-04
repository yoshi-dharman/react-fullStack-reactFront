import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/my.css';

import React, { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbarku from './components/Navbarku';

//page
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubmitPage from './pages/SubmitPage';

function App(props) {
  const isLogin = useSelector(state => state.auth.isLogged);

  return (
    <>
      <Navbarku />
      <Switch>
          {/* <PrivateRoute exact path="/" component={OrderPage}></PrivateRoute> */}
          <Route exact path="/">
              <HomePage />
          </Route>
          <Route exact path="/submit">
              {isLogin ? <SubmitPage /> : <Redirect to={{pathname: "/login",state: { alert: "You Need Log In First" }}}/>}
          </Route>
          <Route path="/login" render={(props) => <LoginPage {...props}/>}>
              {isLogin && <Redirect to="/" />}
          </Route>
          <Route path="/register">
              {!isLogin ? <RegisterPage /> : <Redirect to="/" />}
          </Route>
      </Switch>
    </>
  );
}

export default App;
