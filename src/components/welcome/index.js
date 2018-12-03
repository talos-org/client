// @flow
import * as React from 'react';
import { Divider, Button } from 'antd';
import FlexView from 'react-flexview';
import { Link } from 'react-router-dom';

import HeaderTitle from 'components/HeaderTitle/index';

export default class WelcomeComponent extends React.Component<{}> {
  render() {
    return (
      <FlexView
        column
        vAlignContent="center"
        hAlignContent="center"
        height="100%"
      >
        <FlexView marginBottom={'2em'}>
          <HeaderTitle />
        </FlexView>
        <FlexView column>
          <Link to="/onboarding/existing">
            <Button type="primary" block>
              Connect to Existing Blockchain
            </Button>
          </Link>
          <Divider>or</Divider>
          <Link to="/onboarding/new">
            <Button type="primary" block>
              Create new Blockchain
            </Button>
          </Link>
        </FlexView>
      </FlexView>
    );
  }
}
