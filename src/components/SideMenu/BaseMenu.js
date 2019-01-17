// @flow
import * as React from 'react';
import { computed } from 'mobx';
import { Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

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

  @computed
  get collapsed() {
    // $FlowFixMe
    return this.props.rootStore.rootState.sidebarCollapsed;
  }

  // TODO: Track selected tab using MobX, and handle
  // changes here
  // $FlowFixMe
  handleSelect = ({ item, key, selectedKeys }) => {
    /* TODO: I don't know if we need currentTab stored and I don't know
       how to get this.props.history.push to work here, using <Link> instead */
    this.props.rootStore.rootState.currentTab = key;
  };

  render() {
    /* TODO: for Menu use selectedKeys with tab from path not from mobX,
      currently this breaks when you reload page */
    return (
      <Menu
        defaultSelectedKeys={[`${this.currentTab}`]}
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
