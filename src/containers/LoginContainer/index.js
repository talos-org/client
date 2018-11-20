// @flow
import * as React from 'react';
import LoginComponent from '../../components/login/index';

type Props = {};

export default class LoginContainer extends React.Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <LoginComponent />;
  }
}
