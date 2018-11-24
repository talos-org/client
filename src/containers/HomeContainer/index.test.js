import React from 'react';
import { shallow } from 'enzyme';

import HomeContainer from '.';

describe('Component', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<HomeContainer debug />);

    expect(component).toMatchSnapshot();
  });
});
