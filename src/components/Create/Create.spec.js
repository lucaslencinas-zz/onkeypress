import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';

describe('Create', () => {
  let create;
  let onCancel;
  let onCreateRoom;

  beforeEach(() => {
    onCancel = sandbox.stub();
    onCreateRoom = sandbox.stub();

    create = shallow(
      <Create
        onCancel={onCancel}
        onCreateRoom={onCreateRoom}
      />);
  });

  it('renders the Create', () => {
    create.exists().should.eql(true);
  });
});
