// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('rootStore')
@observer
class BaseMenu extends React.Component<{ tab: string }> {
  // TODO: remove use of mobx for keeping track of tab here.
  // We are using url path instead
  constructor(props: any) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  @computed
  get currentTab() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentTab;
  }

  @computed
  get collapsed() {
    // $FlowFixMe
    return this.props.rootStore.rootState.sidebarCollapsed;
  }

  handleSelect = ({
    item,
    key,
    selectedKeys,
  }: {
    item: string,
    key: string,
    selectedKeys: string[],
  }) => {
    // $FlowFixMe
    this.props.rootStore.rootState.currentTab = key;
  };

  render() {
    const { tab } = this.props;
    return (
      <Menu
        selectedKeys={[tab]}
        mode="inline"
        onSelect={this.handleSelect}
        theme="dark"
        inlineCollapsed={this.collapsed}
      >
        <Menu.Item key="monitoring">
          <Link to="/monitoring">
            <Icon type="dashboard" />
            <span>Monitoring</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="data">
          <Link to="/data">
            <Icon type="desktop" />
            <span>Data</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="account">
          <Link to={'/account'}>
            <Icon type="user" />
            <span>Account</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to="/settings">
            <Icon type="setting" />
            <span>Settings</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default BaseMenu;
