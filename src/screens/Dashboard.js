// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';

import GlobalHeader from 'components/GlobalHeader';
import SideMenu from 'components/SideMenu';

// NOTE: Aaron, this is for when you finally merge my code with yours.
// Simply uncomment the line below, and then in the HoC, just add
// a new `switch` case!
// import Data from 'components/Data';
import Monitoring from 'components/Monitoring';
import Settings from 'components/Settings';

const { Content } = Layout;

const DashboardHoC = (currentTab: string) => {
  switch (currentTab) {
    case 'monitoring':
      return <Monitoring />;
    case 'settings':
      return <Settings />;
    default:
      return <Monitoring />;
  }
};

@inject('rootStore')
@observer
class Dashboard extends React.Component<{}> {
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
    if (this.allowAccessToDashboard) {
      return (
        <Layout>
          <SideMenu />
          <Layout>
            <Content>
              <GlobalHeader />
              {DashboardHoC(this.currentTab)}
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
