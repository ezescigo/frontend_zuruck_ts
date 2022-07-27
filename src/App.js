import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

// import Rodal from 'rodal';
// import 'rodal/lib/rodal.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout-page/checkout-page.component';
import Footer from './components/footer/footer.component';
import { ToastContainer, Slide } from "react-toastify";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { fetchCategoriesStartAsync, fetchCategoriesOffline } from './redux/categories/categories.actions';
import { fetchPreviewStartAsync, fetchCollectionsOffline } from './redux/collections/collections.actions';
import { selectIsCategoriesFetching, selectIsCategoriesLoaded } from './redux/categories/categories.selectors';

import { SpinnerOverlay, SpinnerContainer } from './components/with-spinner/with-spinner.styles';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popUp: true };
  }

  // eslint-disable-next-line no-undef
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, isLoading, fetchCategoriesOffline, fetchCollectionsOffline, fetchCategoriesStartAsync, fetchPreviewStartAsync } = this.props;
    // if (this.props.categoriesLoaded = false) {
    fetchCategoriesStartAsync();
    fetchPreviewStartAsync();
    // };
    // fetchCategoriesOffline();
    // fetchCollectionsOffline();

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // check if signed in
      if (userAuth) {
        // Get back the userRef obj from our createUserProfileDocument method passing userAuth. If it exists in our db, will bring the data, if not will create a new one.
        const userRef = await createUserProfileDocument(userAuth);
        // subscribe/listen to any changes in userRef data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    const RodalStyles = {
      height: 'auto',
      bottom: 'auto',
      top: '50%',
      transform: 'translateY(-50%)'
    }

    return (
      <div className='wrapper'>
        {/* <Rodal
          visible={this.state.popUp}
          onClose={() => this.setState({ popUp: false })}
          animation={'zoom'}
          customStyles={RodalStyles}>
          <p>
            This is a (daily) work-in-progress project!
              <br />
              You may (will) find bugs and unfinished features.
              <br />
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: '5px',
              fontWeight: '600',
            }}>
              <a target="_blank" href='https://escigolini.herokuapp.com/'>Personal Web</a>
              <br />
              <a target="_blank" href='https://github.com/EzeScigo'>GitHub</a>
              <br />
              <a target="_blank" href='https://www.linkedin.com/in/ezequiel-scigolini/'>LinkedIn</a>
            </div>
          </p>
          <p>
            Hope you like it :)
              <br />
              Ezequiel.
            </p>
        </Rodal> */}
        {this.props.isLoading
          ? (<SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>)
          : (<React.Fragment>
            <Header />
            <ToastContainer
              autoClose={3000}
              className='toast-container'
              progressClassName='toastProgress'
              bodyClassName='toastBody'
              position='bottom-center'
              transition={Slide}
              newestOnTop
              draggable
              pauseOnHover />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckOutPage} />
              <Route
                exact path='/signin'
                render={() =>
                  this.props.currentUser ? (
                    <Redirect to='/' />
                  ) : (
                    <SignInAndSignUpPage />
                  )
                }
              />
            </Switch>
            <Footer />
          </React.Fragment>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCategoriesFetching,
  categoriesLoaded: selectIsCategoriesLoaded,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchCategoriesStartAsync: () => dispatch(fetchCategoriesStartAsync()),
  fetchPreviewStartAsync: () => dispatch(fetchPreviewStartAsync()),
  fetchCategoriesOffline: () => dispatch(fetchCategoriesOffline()),
  fetchCollectionsOffline: () => dispatch(fetchCollectionsOffline())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
