// @flow
import * as React from 'react';
// $FlowFixMe
import { Card, Empty, Icon, Statistic } from 'antd';
import { computed } from 'mobx';
import { inject } from 'mobx-react';

import { getNodeAddress } from 'api/monitoring';

export default class CurrentNode extends React.Component<{
  currentNodeData: Object,
}> {
  render() {
    const { currentNodeData } = this.props;

    if (!currentNodeData) {
      return (
        <Card title="Current Node Information">
          <Empty description="No node selected" />
        </Card>
      );
    } else {
      const {
        addr,
        addrlocal,
        banscore,
        bytesrecv,
        bytessent,
      } = currentNodeData;
      return (
        <Card title="Current Node Information">
          <p>Address: {addr}</p>
          <p>Local address: {addrlocal}</p>
          <p>Total bytes received: {bytesrecv}</p>
          <p>Total bytes sent: {bytessent}</p>
          <p>Ban score: {banscore}</p>
        </Card>
      );
    }
  }
}

@inject('rootStore')
class NodeAddress extends React.Component<{}> {
  currentNodeAddress: string;

  @computed
  get currentBlockchain() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentBlockchain;
  }

  async componentWillMount() {
    const { data } = await getNodeAddress(this.currentBlockchain);
    this.currentNodeAddress = data.nodeAddress;
  }

  render() {
    return (
      <Card style={{ marginTop: '12px' }}>
        <Statistic
          prefix={
            <Icon
              style={{ color: 'rgba(0, 15, 64, 0.65)' }}
              type="deployment-unit"
            />
          }
          title="Current Node Address"
          value={this.currentNodeAddress}
          valueStyle={{ color: '#71EE17', fontSize: '16px' }}
        />
      </Card>
    );
  }
}

export { NodeAddress };
