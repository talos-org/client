// @flow
import * as React from 'react';
import { Button, Col, Divider, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';

import HeaderTitle from 'components/HeaderTitle';

const { Content } = Layout;

export default class Welcome extends React.Component<{}> {
  render() {
    return (
      <Content>
        <Row>
          <Col span={12} />
          <Col span={12}>
            <HeaderTitle />
            <Link to="/wizard/existing">
              <Button type="primary" block>
                Connect to Existing Blockchain
              </Button>
            </Link>
            <Divider>or</Divider>
            <Link to="/wizard/new">
              <Button type="primary" block>
                Create new Blockchain
              </Button>
            </Link>
          </Col>
        </Row>
      </Content>
    );
  }
}
