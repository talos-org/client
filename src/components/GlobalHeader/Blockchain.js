// @flow
import * as React from 'react';

import { Icon, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';

import DisconnectModal from 'components/ui/Modal';

@inject('rootStore')
@observer
class Blockchain extends React.Component<
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

  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.rootState = this.rootStore.rootState;

    this.handleCancel = this.handleCancel.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleDisconnect = () => {
    this.setState({ confirmLoading: true });

    setTimeout(() => {
      this.setState({ confirmLoading: false, visible: false });
    }, 1500);

    this.rootStore.disconnect();
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  render() {
    const { confirmLoading, visible } = this.state;
    return (
      <div>
        <DisconnectModal
          children={<p>Are you sure about this?</p>}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleDisconnect}
          title={'Confirm'}
          visible={visible}
        />
        <span>
          <h1>{this.rootState.currentBlockchain}</h1>
          <Tooltip placement="right" title="Disconnect">
            <Icon
              className="trigger"
              onClick={this.showModal}
              theme="outlined"
              type="disconnect"
            />
          </Tooltip>
        </span>
      </div>
    );
  }
}

export default Blockchain;
