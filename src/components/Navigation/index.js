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
import { Link, Redirect, Switch, Route } from 'react-router-dom';

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
  {
    match: object,
    location: object,
  },
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
    const { match, location } = this.props;
    const { path } = match;

    if (reload) {
      this.setState({ reload: false });
      return <Redirect to="/" />;
    }

    const breadcrumbNameMap = {
      '/monitoring': 'Monitoring',
      '/data': 'Data',
      '/account': 'Account',
      '/settings': 'Settings',
    };

    const pathSnippets = location.pathname.split('/').filter(i => i);
    let breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">
          <Icon type="home" />
        </Link>
      </Breadcrumb.Item>,
    ].concat(
      pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>
              {breadcrumbNameMap[url] || pathSnippets[index]}
            </Link>
          </Breadcrumb.Item>
        );
      }),
    );

    return (
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <HeaderTitle />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[
              (pathSnippets.length > 0 && pathSnippets[0]) || 'monitoring',
            ]}
          >
            <Menu.Item key="monitoring">
              <Link to={`${path}monitoring`}>
                <Icon type="pie-chart" />
                <span>Monitoring</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="data">
              <Link to={`${path}data`}>
                <Icon type="desktop" />
                <span>Data</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="account">
              <Link to={`${path}account`}>
                <Icon type="user" />
                <span>Account</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to={`${path}settings`}>
                <Icon type="setting" />
                <span>Settings</span>
              </Link>
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
              {breadcrumbItems}
            </Breadcrumb>
            <Content
              style={{
                margin: 0,
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Switch>
                <Route
                  path={`${path}monitoring`}
                  component={MonitoringContainer}
                />
                <Route path={`${path}data`} component={DataContainer} />
                <Route
                  path={`${path}account`}
                  render={() => <div>In construction...</div>}
                />
                <Route
                  path={`${path}settings`}
                  render={() => <div>In construction...</div>}
                />
                <Redirect from="/" to={`${path}monitoring`} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
