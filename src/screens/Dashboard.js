// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';

import GlobalHeader from 'components/GlobalHeader';
import SideMenu from 'components/SideMenu';

const { Content } = Layout;

@inject('rootStore')
@observer
class Dashboard extends React.Component<{ children?: React.Node }> {
  @computed
  get allowAccessToDashboard() {
    // $FlowFixMe
    return Boolean(this.props.rootStore.rootState.currentBlockchain);
  }

  render() {
    const { children } = this.props;

    if (this.allowAccessToDashboard) {
      return (
        <Layout>
          <SideMenu />
          <Layout>
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
