import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Home from './components/Home';
import Join from './containers/Join';
import Room from './containers/Room';
import Player from './containers/Player';
import Create from './containers/Create';
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
      name="Join"
      path="/join"
      component={Join}
    />
    <Route
      name="Create"
      path="/create"
      component={Create}
    />
    <Route
      name="Room"
      path="/rooms/:roomSlug"
      component={Room}
    />

    <Route
      name="Player"
      path="/rooms/:roomSlug/players/:playerSlug"
      component={Player}
    />
  </Route>
);
