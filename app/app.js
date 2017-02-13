require('./css/main.css');
require('./css/app.css');

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import LoginScreen from './pages/login.js';
import ProfileScreen from './pages/profile.js';
import MessagesScreen from './pages/messages.js';

//React ruter
ReactDOM.render(
   <Router history={hashHistory}>
      <Route path="/" component={LoginScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/messages" component={MessagesScreen} />
   </Router>,
document.getElementById('app'));

[].slice.call( document.querySelectorAll('a[href="#"') ).forEach( function(el) {
	el.addEventListener( 'click', function(ev) { ev.preventDefault(); } );
});

