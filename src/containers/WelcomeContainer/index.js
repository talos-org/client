// @flow
import * as React from 'react';
import WelcomeComponent from '../../components/welcome/index';

type Props = {};

export default class WelcomeContainer extends React.Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <WelcomeComponent />;
  }
}
