// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import styled from 'styled-components';

import BaseMenu from './BaseMenu';

const { Sider } = Layout;

const SiderLogo = styled.div`
  color: #fefefe;
  height: 64px;
  line-height: 64px;
  padding-left: 24px;
  transition: all 0.3s;
  vertical-align: middle;
  img {
    display: inline-block;
    height: 32px;
    width: 32px;
  }
  span {
    font-size: 22px;
    font-weight: 400;
    padding: 0 14px;
  }
`;

@inject('rootStore')
@observer
class SideMenu extends React.Component<{}> {
  @computed
  get collapsed() {
    // $FlowFixMe
    return this.props.rootStore.rootState.sidebarCollapsed;
  }

  render() {
    return (
      <Sider collapsed={this.collapsed} collapsible trigger={null} width={256}>
        <SiderLogo>
          <img alt="logo" src={`${require('images/logo--isometric@2x.svg')}`} />
          <span>Talos</span>
        </SiderLogo>
        <BaseMenu />
      </Sider>
    );
  }
}

export default SideMenu;
