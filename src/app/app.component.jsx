import React from 'react';
import history from './utils/history'
import { connect } from 'react-redux';
import { Switch, Route, Router, withRouter } from 'react-router-dom';
import ConditionalRoute from './components/ConditionalRoute';

import Header from './components/Header';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import ToDoList from './screens/ToDoList';

import './themes/default/app.scss';
class App extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="App">
        <Router history={history}>
          <React.Fragment>
            <Header />
            <div className="content-wrapper">
              <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/sign-up" component={SignUp} />
                <ConditionalRoute exact condition={profile} path="/to-do" component={ToDoList}  redirectTo="/"/>
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const profile = state.auth.profile ? state.auth.profile.email : null;
  return {
    profile
  }
}


export default connect(mapStateToProps, null)(withRouter(App));

