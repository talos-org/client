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
      <div>
        <FlexView hAlignContent="center">
          <HeaderTitle />
        </FlexView>
        <FlexView hAlignContent="center">
          <div>
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
          </div>
        </FlexView>
      </div>
    );
  }
}
