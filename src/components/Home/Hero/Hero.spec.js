import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

describe('Hero', () => {
  let hero;

  beforeEach(() => {
    hero = shallow(<Hero />);
  });

  it('renders the Hero', () => {
    hero.exists().should.eql(true);
  });
});
