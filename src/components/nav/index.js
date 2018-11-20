// @flow
import * as React from 'react';

import { Icon, Layout, Menu } from 'antd';

import HeaderTitle from '../../components/headertitle/index';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';

const { Content, Header, Sider } = Layout;

type Props = {};

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
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}
