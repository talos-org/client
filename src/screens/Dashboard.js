// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

import GlobalHeader from 'components/GlobalHeader';
import SideMenu from 'components/SideMenu';

import DataContainer from 'containers/DataContainer';
import Monitoring from 'components/Monitoring';
import Admin from 'components/Admin';

const { Content } = Layout;

@inject('rootStore')
@observer
class Dashboard extends React.Component<
  {
    match: object,
    location: object,
  },
  {},
> {
  @computed
  get allowAccessToDashboard() {
    // $FlowFixMe
    return Boolean(this.props.rootStore.rootState.currentBlockchain);
  }

  @computed
  get currentTab() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentTab;
  }

  render() {
    const { match, location } = this.props;
    const { path } = match;

    const breadcrumbNameMap = {
      '/monitoring': 'Monitoring',
      '/data': 'Data',
      '/admin': 'Admin',
      '/settings': 'Settings',
    };

    if (this.allowAccessToDashboard) {
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
        <Layout>
          <SideMenu
            tab={(pathSnippets.length > 0 && pathSnippets[0]) || 'monitoring'}
          />
          <Layout>
            <GlobalHeader />
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
                  <Route path={`${path}monitoring`} component={Monitoring} />
                  <Route path={`${path}data`} component={DataContainer} />
                  <Route path={`${path}admin`} component={Admin} />
                  <Route
                    path={`${path}settings`}
                    render={() => <div>In construction...</div>}
                  />
                  <Redirect from="/" to={`${path}monitoring`} />
                </Switch>
              </Content>
            </Layout>
            {/* <Content>
              {DashboardHoC(this.currentTab)}
            </Content> */}
          </Layout>
        </Layout>
      );
    } else {
      return <Redirect to="/welcome" />;
    }
  }
}

export default Dashboard;
