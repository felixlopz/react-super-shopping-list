import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBars,
  faTimes, 
  faCheck,
  faPlus,
  faChevronLeft,
  faMinus,
  faDollarSign,
  faEye,
  faSignOutAlt,
  faPencilAlt,
  faTrash,

 } from '@fortawesome/free-solid-svg-icons';

 import { FadeInAnimation } from './utils/animations';
 import styled from 'styled-components';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Alert from './components/Alert';
import Loading from './components/Loading';

// Containers
import DashBoard from './containers/DashBoard';
import Welcome from './containers/Welcome';

// redux
import { connect } from 'react-redux';
// actions
import { logOut } from './actions/auth';
import { initApp } from './actions/control';

library.add(
 faBars,
 faTimes,
 faCheck,
 faPlus, 
 faChevronLeft,
 faMinus,
 faDollarSign,
 faEye,
 faSignOutAlt,
 faPencilAlt,
 faTrash,
);


const AppWrapper = styled.div`
  height: 100vh;


`


class App extends Component {
  componentDidMount() {
    this.props.onInitApp();
  }

  render() {
    const { isUserLogged, isAppInitialized } = this.props.control;
    return (
      <>
        {isAppInitialized ? (
          <FadeInAnimation>
            <AppWrapper>
              <NavBar/>
              {isUserLogged ? <DashBoard /> : <Welcome />}
              <Footer/>
              <Alert/>
            </AppWrapper>
          </FadeInAnimation>
        ) : <Loading />
        }
      </> 
    )
  }
}

function mapStateToProps(state) {
  return {
    control: state.control
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInitApp() {
      dispatch(initApp());
    },
    onLogOut() {
      dispatch(logOut());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
