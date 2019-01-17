// @flow
import * as React from 'react';
import { Button, Divider } from 'antd';
import { computed } from 'mobx';
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
    // $FlowFixMe
    return this.props.rootStore.rootState.currentBlockchain;
  }

  render() {
    const currentBlockchain = this.name;

    if (currentBlockchain) {
      return <Redirect to="/" />;
    } else {
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
              <Button block type="primary">
                Create new blockchain
              </Button>
            </Link>
          </FlexView>
        </FlexView>
      );
    }
  }
}

export default WelcomeComponent;
