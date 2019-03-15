// @flow
import * as React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { List, Switch } from 'antd';

@inject('rootStore')
@observer
class GeneralSettings extends React.Component<{}> {
  @action
  handleNotificationsChange = (checked: boolean, event: Event) => {
    // $FlowFixMe
    this.props.rootStore.settingsStore.toggleNetworkLossNotifications();
  };

  @action
  handleSideMenuChange = (checked: boolean, event: Event) => {
    // $FlowFixMe
    this.props.rootStore.globalHeaderStore.toggleSideMenu();
  };

  @computed
  get notifyNetworkLoss() {
    // $FlowFixMe
    return this.props.rootStore.settingsStore.notifyNetworkLoss;
  }

  @computed
  get sideMenuCollapsed() {
    // $FlowFixMe
    return this.props.rootStore.globalHeaderStore.sidebarCollapsed;
  }

  getData = () => {
    const toggleNotifications = (
      <Switch
        checkedChildren="← OFF"
        defaultChecked={this.notifyNetworkLoss}
        onChange={this.handleNotificationsChange}
        unCheckedChildren="ON →"
      />
    );

    const toggleSideMenu = (
      <Switch
        checkedChildren="← SHOW"
        defaultChecked={this.sideMenuCollapsed}
        onClick={this.handleSideMenuChange}
        unCheckedChildren="HIDE →"
      />
    );

    return [
      {
        title: 'Toggle side menu',
        description: 'Hide (or show) the side menu',
        actions: [toggleSideMenu],
      },
      {
        title: 'Toggle network connectivity notifications',
        description: 'Be notified when you lose network connection',
        actions: [toggleNotifications],
      },
    ];
  };

  render() {
    return (
      <React.Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </React.Fragment>
    );
  }
}

export default GeneralSettings;
