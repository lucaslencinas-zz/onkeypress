import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Home from './containers/Home';
import Chat from './containers/Chat';
import Layout from './containers/Layout';

export default (
  <Route
    name="Root"
    path={'/'}
    component={Layout}
  >
    <IndexRoute
      name="Home"
      component={Home}
    />
    <Route
      name="Chat"
      path="chat/"
      component={Chat}
    />
  </Route>
);
