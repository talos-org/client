// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class BaseMenu extends React.Component<{}> {
  constructor(props: any) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  @computed
  get currentTab() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentTab;
  }

  // TODO: Track selected tab using MobX, and handle
  // changes here
  // $FlowFixMe
  handleSelect = ({ item, key, selectedKeys }) =>
    (this.props.rootStore.rootState.currentTab = key);

  render() {
    return (
      <Menu
        defaultSelectedKeys={[`${this.currentTab}`]}
        mode="inline"
        onSelect={this.handleSelect}
        theme="dark"
      >
        <Menu.Item key="monitoring">
          <Icon type="dashboard" />
          <span>Monitoring</span>
        </Menu.Item>
        <Menu.Item key="data">
          <Icon type="desktop" />
          <span>Data</span>
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="user" />
          <span>Account</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default BaseMenu;
