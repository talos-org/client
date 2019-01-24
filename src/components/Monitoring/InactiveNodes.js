// @flow
import * as React from 'react';
import { Card, Empty } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class CurrentNode extends React.Component<{}> {
  @computed
  get inactiveNodes() {
    return this.props.rootStore.graphStore.inactiveNodes;
  }

  render() {
    console.log(this.inactiveNodes);

    if (!this.inactiveNodes.length > 0) {
      return (
        <Card title="Inactive Nodes">
          <Empty description="No information available" />
        </Card>
      );
    } else {
      return (
        <Card title="Inactive Nodes">
          {this.inactiveNodes.forEach(inactiveNode => (
            <span>{inactiveNode}</span>
          ))}
        </Card>
      );
    }
  }
}

export default CurrentNode;
