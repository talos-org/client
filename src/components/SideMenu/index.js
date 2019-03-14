// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';

import BaseMenu from './BaseMenu';
import { SiderLogo } from './index.styles';

const { Sider } = Layout;

@inject('rootStore')
@observer
class SideMenu extends React.Component<{ tab: string }> {
  @computed
  get collapsed() {
    // $FlowFixMe
    return this.props.rootStore.globalHeaderStore.sidebarCollapsed;
  }

  render() {
    const { tab } = this.props;

    return (
      <Sider collapsed={this.collapsed} collapsible trigger={null} width={256}>
        <SiderLogo>
          <img alt="logo" src={`${require('images/logo--isometric@2x.svg')}`} />
          {!this.collapsed && <span>Talos</span>}
        </SiderLogo>
        <BaseMenu tab={tab} />
      </Sider>
    );
  }
}

export default SideMenu;
