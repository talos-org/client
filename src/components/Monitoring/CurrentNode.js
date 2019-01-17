// @flow
import * as React from 'react';
import { Card, Empty, Spin } from 'antd';

export default class CurrentNode extends React.Component<{
  currentNodeData: Object,
}> {
  render() {
    const { currentNodeData } = this.props;

    if (!currentNodeData) {
      return (
        <React.Suspense fallback={<Spin />}>
          <Card title="Current Node Information">
            <Empty description="No node selected" />
          </Card>
        </React.Suspense>
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
        <Card title="Current Node">
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
