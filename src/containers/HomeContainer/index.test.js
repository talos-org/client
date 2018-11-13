import React from 'react';
import { shallow } from 'enzyme';

import { HomeContainer as Component } from '.';

describe('Component', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Component debug />);

    expect(component).toMatchSnapshot();
  });
});
