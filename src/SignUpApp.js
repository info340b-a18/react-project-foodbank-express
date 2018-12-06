import React, { Component } from 'react';
import SignUpForm from './components/signup/SignUpForm';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import WelcomeHeader from './components/WelcomeHeader';

// import ChirpBox from './components/chirper/ChirpBox';
// import ChirperHeader from './components/chirper/ChirperHeader';
// import ChirpList from './components/chirper/ChirpList';

class SignUpApp extends Component {
    constructor(props){
      super(props);
      this.state = {loading: true};
    }
  
    componentDidMount() {
      this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
        if(firebaseUser) {
          this.setState({user: firebaseUser, loading: false});
        } else {
          this.setState({user: null, loading: false});
        }
      });
    }
  
    componentWillUnmount() {
      this.authUnRegFunc();
    }
  
    //A callback function for registering new users
    handleSignUp(email, password, handle, avatar) {
      this.setState({errorMessage:null}); //clear any old errors\
      /* TODO: sign up user here */
      firebase.auth().createUserWithEmailAndPassword(email, password) 
        .then((userCredentials) => {
          let user = userCredentials.user; //access the newly created user
          console.log('User created: '+user.uid);
          //update user profile
          user.updateProfile({
            displayName: handle,
            photoURL: avatar
          }).then(function() {
            // Update successful.
            return user;
          }).catch(function(error) {
            // An error happened.
            this.setState({errorMessage: error.message});
            console.log(error.message);
          });
        });
      
      var bankInfo = {
        handle: handle,
        email: email
      };

      let banksRef = firebase.database().ref('banks');
      banksRef.push({bankInfo});
    }
  
    //A callback function for logging in existing users
    // handleSignIn(email, password) {
    //   this.setState({errorMessage:null}); //clear any old errors
  
    //   /* TODO: sign in user here */
    //   firebase.auth().signInWithEmailAndPassword(email, password)
    //     .catch((err) => this.setState({errorMessage:err.message})); //log any errors for debugging
    // }
  
    //A callback function for logging out the current user
    handleSignOut(){
      this.setState({errorMessage:null}); //clear any old errors
  
      /* TODO: sign out user here */
      firebase.auth().signOut()
        .catch((err) => this.setState({errorMessage:err.message})); //log any errors for debugging
    }
  
    render() {
  
      let content=null; //content to render
  
      if (this.state.loading) {
        return (
          <div className="text-center">
              <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
          </div>
        )
      }
  
      if(!this.state.user) { //if logged out, show signup form
        content = (
          <div className="container">
            <h1>Sign Up</h1>
            <SignUpForm 
              signUpCallback={(e,p,h,a) => this.handleSignUp(e,p,h,a)} 
            />
          </div>
        );
      } 
      else { //if logged in, show welcome message
        content = (
            <div>
                <WelcomeHeader user={this.state.user}>
                    {/* log out button is child element */}
                    {this.state.user &&
                    <button className="btn btn-warning" 
                            onClick={() => this.handleSignOut()}>
                        Log Out {this.state.user.displayName}
                    </button>
                    }
                </WelcomeHeader>
          </div>
        );
      }
      return (
        <div>
          {this.state.errorMessage &&
            <p className="alert alert-danger">{this.state.errorMessage}</p>
          }
          {content}
        </div>
      );
    }
  }
  
  export default SignUpApp;