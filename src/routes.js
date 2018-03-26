import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Home from './components/Home';
import Join from './components/Join';
import Room from './components/Room';
import Games from './components/Games';
import Player from './components/Player';
import Create from './components/Create';
import Layout from './components/Layout';

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
      name="Games"
      path="/games"
      component={Games}
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
