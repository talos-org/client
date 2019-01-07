// @flow
import * as React from 'react';
import FlexView from 'react-flexview';
import {
  Icon,
  Avatar,
  Dropdown,
  Layout,
  Menu,
  Breadcrumb,
  Tooltip,
} from 'antd';
import { Link, Redirect } from 'react-router-dom';

import HeaderTitle from 'components/HeaderTitle/index';
import MonitoringContainer from 'containers/MonitoringContainer/index';
import DataContainer from 'containers/DataContainer/index';

const { Content, Header, Sider } = Layout;

const avatarMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/login">Log out</Link>
    </Menu.Item>
  </Menu>
);

export default class SiderDemo extends React.Component<
  {},
  {
    collapsed: boolean,
    reload: boolean,
  },
> {
  state = {
    collapsed: false,
    reload: false /* used to reload the page when we disconnect from a chain */,
  };

  disconnectChain = () => {
    localStorage.removeItem('chainName');
    this.setState({ reload: true });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { reload, collapsed } = this.state;

    if (reload) {
      this.setState({ reload: false });
      return <Redirect to="/" />;
    }

    return (
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <HeaderTitle />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Monitoring</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Data</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>Account</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="setting" />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '1em' }}>
            <FlexView vAlignContent="center" height="100%">
              <FlexView>
                <Icon
                  className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                  style={{ fontSize: '1.5em' }}
                />
              </FlexView>
              <FlexView marginLeft="auto">
                <h1 style={{ margin: 0 }}>
                  '{localStorage.getItem('chainName')}'
                </h1>
                <Tooltip placement="bottom" title="disconnect">
                  <Icon
                    className="trigger"
                    style={{ lineHeight: '64px', marginLeft: '5px' }}
                    type="disconnect"
                    onClick={this.disconnectChain}
                  />
                </Tooltip>
              </FlexView>
              <FlexView marginLeft="auto">
                <Dropdown overlay={avatarMenu} placement="bottomCenter">
                  <Avatar icon="user" />
                </Dropdown>
              </FlexView>
            </FlexView>
          </Header>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Monitoring</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                margin: 0,
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <DataContainer />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
