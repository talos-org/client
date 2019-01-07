// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { Divider, Button } from 'antd';
import FlexView from 'react-flexview';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Logo from 'components/ui/Logo';

@withRouter
@inject('rootStore')
@observer
class WelcomeComponent extends React.Component<{}> {
  @computed
  get name() {
    return this.props.rootStore.blockchainStore.name;
  }

  render() {
    const { currentBlockchain } = this.name;

    if (!currentBlockchain) {
      return (
        <FlexView
          column
          vAlignContent="center"
          hAlignContent="center"
          height="100%"
        >
          <FlexView marginBottom={'2em'}>
            <Logo />
          </FlexView>
          <FlexView column>
            <Link to="/wizard/existing">
              <Button type="primary" block>
                Connect to existing blockchain
              </Button>
            </Link>
            <Divider>or</Divider>
            <Link to="/wizard/new">
              <Button type="primary" block>
                Create new blockchain
              </Button>
            </Link>
          </FlexView>
        </FlexView>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default WelcomeComponent;
