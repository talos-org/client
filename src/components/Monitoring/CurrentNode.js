// @flow
import * as React from 'react';
// $FlowFixMe
import { Card, Empty, Icon, List, Statistic } from 'antd';
import { computed } from 'mobx';
import { inject } from 'mobx-react';

import { getNodeAddress } from 'api/monitoring';

export default class CurrentNode extends React.Component<{
  currentNodeData: Object,
}> {
  render() {
    const { currentNodeData } = this.props;

    const getData = () => {
      const {
        addr,
        addrlocal,
        banscore,
        bytesrecv,
        bytessent,
      } = currentNodeData;

      return [
        {
          title: 'Ban Score',
          description: `${banscore}`,
        },
        {
          title: 'Address',
          description: addr,
        },
        {
          title: 'Local Address',
          description: addrlocal,
        },
        {
          title: 'Data received',
          description: `${bytesrecv}B`,
        },
        {
          title: 'Data sent',
          description: `${bytessent}B`,
        },
      ];
    };

    if (!currentNodeData) {
      return (
        <Card title="Current Node Information">
          <Empty description="No node selected" />
        </Card>
      );
    } else {
      return (
        <Card title="Current Node Information">
          <List
            dataSource={getData()}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item actions={item.actions}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
            size="small"
          />
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
