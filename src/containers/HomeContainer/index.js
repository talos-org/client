// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { getChainName } from 'utils/chainName';
import SiderDemo from 'components/Navigation';

const chainName = getChainName();
const CHAIN_NAME_EXISTS = process.env.__BYPASS_SIGN_UP_WIZARD__ || chainName;

export default class HomeContainer extends React.Component<
  {},
  {
    redirectToReferrer: boolean,
  },
> {
  state = {
    redirectToReferrer: true,
  };

  componentDidMount() {
    if (CHAIN_NAME_EXISTS) {
      this.setState({ redirectToReferrer: false });
    }
  }

  render() {
    const { cameFrom } = this.props.location.state || {
      cameFrom: { pathname: '/' },
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={cameFrom} />;
    }

    return <SiderDemo />;
  }
}
