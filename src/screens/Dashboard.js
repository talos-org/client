// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';

import GlobalHeader from 'components/GlobalHeader';
import RootStore from 'stores/RootStore';
import SideMenu from 'components/SideMenu';

const { Content } = Layout;

@inject('rootStore')
@observer
class Dashboard extends React.Component<{ children?: React.Node }> {
  rootStore: RootStore;
  rootState: Object;

  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.rootState = this.rootStore.rootState;
  }

  render() {
    const { children } = this.props;

    if (this.rootStore.allowAccessToDashboard) {
      return (
        <Layout>
          <SideMenu />
          <Layout style={{ minHeight: '100vh' }}>
            <Content>
              <GlobalHeader />
              {children}
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      return <Redirect to="/welcome" />;
    }
  }
}

export default Dashboard;
