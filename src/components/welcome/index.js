// @flow
import * as React from 'react';

import { Divider, Button } from 'antd';

import HeaderTitle from '../../components/headertitle/index';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import FlexView from 'react-flexview';

type Props = {};

export default class WelcomeComponent extends React.Component {
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
