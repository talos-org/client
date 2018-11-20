// @flow
import * as React from 'react';

import { Form, Icon, Input, Button } from 'antd';

import HeaderTitle from '../../components/headertitle/index';

import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import FlexView from 'react-flexview';

type Props = {};

export default class LoginComponent extends React.Component {
  render() {
    return (
      <div>
        <FlexView hAlignContent="center">
          <HeaderTitle />
        </FlexView>
        <FlexView hAlignContent="center">
          <Form onSubmit={() => {}} className="login-form">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="user"
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Link to="/">
                <Button
                  type="primary"
                  hmtlType="submit"
                  className="login-form-button"
                  style={{ width: '100%' }}
                >
                  Login
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </FlexView>
      </div>
    );
  }
}
