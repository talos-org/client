import React from 'react';
import { shallow } from 'enzyme';

import Welcome from '.';

describe('Welcome', () => {
  it('should render correctly in “debug” mode', () => {
    const component = shallow(<Welcome debug />);

    expect(component).toMatchSnapshot();
  });
});
