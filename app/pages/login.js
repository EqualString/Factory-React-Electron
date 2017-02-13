'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';

import TopLoader from '../components/TopLoader.js';
import store  from '../libs/store.js';

class LoginScreen extends React.Component{
  constructor(){
      super();
      this.state = {
        name: '',
        email:'',
        password:'',
        err:'',
        loader: 0
      };

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    document.title = "Factory - Login";
    //Hardkodane informacije -> spremanje u store
    store.dispatch({type: "SET_USER_COVER_IMAGE" , payload: AppDefaults.info.coverImgURL});
    store.dispatch({type: "SET_USER_PROFILE_IMAGE" , payload: AppDefaults.info.profileImgURL});
    store.dispatch({type: "SET_USER_MESSAGES" , payload: AppDefaults.messages});
  }
  focusEmptyInput(){
    //Focus prvog praznog inputa
    for (var ref in this.refs) {
      if(this.state[ref] === ''){
        this.refs[ref].focus();
        break;
      }
    }
  }
  handleNameChange(e){
    this.setState({name: e.target.value});
  }
  handleEmailChange(e){
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();  

    const name = this.state.name.trim();
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    //Provjeri prazne inpute i focus na prvi prazan
    if((name === '')||(email === '')||(password === '')){
      this.setState({ err: 'All fields are required.'});
      this.focusEmptyInput();
      return;
    }

    //Provjeri uneseni email
    const valid = (email.search(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != -1) ? true : false;
    if(!valid){
      this.setState({ err: 'Invalid email address entered.'});
      this.refs.email.focus();
      return;
    }

    this.setState({ err: ''});
    

    /** AJAX REST calls............ **/
    const userInfo = {
      name: name,
      email: email,
      pass: password
    };

    this.setState({ loader: 100});

    //Store dispatch
    store.dispatch({type: "SET_USER_INFO" , payload: userInfo});
    /****/

    //Forward na Profil screen
    setTimeout(function(){
      forwardTo('/profile');
    },1280);  
  }
  render(){
    return (
      <div className="login-page">
        <div className="wrapper">
          <TopLoader show={this.state.loader}/>
          <form className="login-form" onSubmit={this.handleSubmit}>    
              <div className="title">
                  <h1>Login</h1>
                  <p>Please enter your login informations.</p>
              </div>    
              <div className={(this.state.err === "") ? "hidden" : "error-message fadeIn"}>
                  <p>{this.state.err}</p>
              </div>
              <input
                  type="text"
                  ref="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Your Name"
              />
              <input
                  type="text"
                  ref="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder="Email"
              />
              <input
                  type="password"
                  ref="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
              />
              <button type="submit" className="btn">Login</button>
          </form>
        </div>  
      </div>
    );
  }
}

function forwardTo(location) {
    hashHistory.push(location);
}

const AppDefaults={
  info:{
    coverImgURL: "./img/cover-image.jpg",
    profileImgURL: "./img/profile-image.jpg"  
  },
  messages: [
    {message:"One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly."},
    {message:"The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox."},
    {message:"The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words."}
  ]
};

export default LoginScreen;