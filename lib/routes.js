import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { replace } from 'react-router-redux';
import { Authenticate } from '@ftbl/support';

import { Main, NotFound, Denied, Error } from './handlers';
import { Signup } from './apps/signup/handlers';

import { routes as contact } from '@ftbl/contact-web';
import { routes as session, handlers } from '@ftbl/session-web';
import { routes as user } from '@ftbl/user-web';

import signup from './apps/signup/routes';

const IsAuthenticated = Authenticate({
  sessionSelector: state => state.session.user
, redirectAction: replace
});

export default function(store) {
  return (
    <Route path='/' component={Main}>
      <IndexRoute component={Signup}/>
      
      {session}
      {signup}
      
      {user(IsAuthenticated)}
      {contact(IsAuthenticated)}

      <Route path='error' component={Error}/>
      <Route path='denied' component={Denied}/>
      <Route path='*' component={NotFound}/>
    </Route>
  );
};