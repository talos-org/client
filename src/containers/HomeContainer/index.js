// @flow
import * as React from 'react';

import SiderDemo from '../../components/nav/index';

type Props = {};

class HomeContainer extends React.Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <SiderDemo />;
  }
}

export { HomeContainer };
