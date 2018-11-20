// @flow
import * as React from 'react';
import LoginScreen from '../../components/login/index';

type Props = {};

class LoginContainer extends React.Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <LoginScreen />;
  }
}

export { LoginContainer };
