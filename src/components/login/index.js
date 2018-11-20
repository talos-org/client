// @flow
import * as React from 'react';

import Login from 'ant-design-pro/lib/Login';
import { Divider, Button } from 'antd';

import HeaderTitle from '../../components/headertitle/index';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import FlexView from 'react-flexview';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

type Props = {};

export default class LoginScreen extends React.Component {
  render() {
    return (
      <div>
        <FlexView hAlignContent="center">
          <HeaderTitle />
        </FlexView>
        <FlexView hAlignContent="center">
          <Login defaultActiveKey="tab1" onSubmit="">
            <Tab key="tab1" tab="Blockchain">
              <Button type="primary" block>
                Connect to Existing Blockchain
              </Button>
              <Divider>or</Divider>
              <Button type="primary" block>
                Create new Blockchain
              </Button>
            </Tab>
            <Tab key="tab2" tab="Account">
              <UserName name="username" />
              <Password name="password" />
              <Submit>Login</Submit>
            </Tab>
          </Login>
        </FlexView>
      </div>
    );
  }
}
