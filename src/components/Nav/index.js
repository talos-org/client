// @flow
import * as React from 'react';

import { Icon, Avatar, Dropdown, Layout, Menu, Breadcrumb } from 'antd';

import MonitoringContainer from '../../containers/MonitoringContainer/index';
import FlexView from 'react-flexview';

import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';

const { Content, Header, Sider } = Layout;

type Props = {};

const avatarMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/login">Log out</Link>
    </Menu.Item>
  </Menu>
);

export default class SiderDemo extends React.Component<
  Props,
  {
    collapsed: boolean,
  },
> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
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
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                  style={{ fontSize: '1.5em' }}
                />
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
              <MonitoringContainer />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
