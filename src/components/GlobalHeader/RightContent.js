// @flow
import * as React from 'react';
import { Avatar, Dropdown, Icon, Menu } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import DisconnectModal from 'components/ui/Modal';

@inject('rootStore')
@observer
class RightContent extends React.Component<
  {},
  {
    confirmLoading: boolean,
    visible: boolean,
  },
> {
  state = {
    confirmLoading: false,
    visible: false,
  };

  constructor(props: any) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  @computed
  get currentBlockchain() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentBlockchain;
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleDisconnect = () => {
    this.setState({ confirmLoading: true });

    setTimeout(() => {
      this.setState({ confirmLoading: false, visible: false });
    }, 1500);

    // $FlowFixMe
    this.props.rootStore.disconnect();
  };

  handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'disconnect') {
      this.showModal();
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  render() {
    const { confirmLoading, visible } = this.state;
    const menu = (
      <Menu selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="disconnect">
          <Icon type="logout" />
          <span>Disconnect</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div style={{ float: 'right', marginRight: '25px' }}>
        <DisconnectModal
          children={
            <p>
              Are you sure you wish to disconnect from the current blockchain?
            </p>
          }
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleDisconnect}
          title={'Confirm'}
          visible={visible}
        />
        <Dropdown overlay={menu}>
          <span>
            <Avatar alt="avatar" size="small">
              {this.currentBlockchain.charAt(0).toUpperCase()}
            </Avatar>
            <span style={{ marginLeft: '7px' }}>{this.currentBlockchain}</span>
          </span>
        </Dropdown>
      </div>
    );
  }
}

export default RightContent;
