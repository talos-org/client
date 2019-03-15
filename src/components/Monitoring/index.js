// @flow
import * as React from 'react';
// $FlowFixMe
import { Card, Col, Row, Skeleton } from 'antd';
import { computed, observable } from 'mobx';
import { Graph } from 'react-d3-graph';
import { inject, observer } from 'mobx-react';

import CurrentNode, { NodeAddress } from 'components/Monitoring/CurrentNode';

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    highlightStrokeColor: 'blue',
    labelProperty: 'name',
    size: 120,
  },
  link: {
    highlightColor: '#033fff',
  },
};

@inject('rootStore')
@observer
class MonitoringComponent extends React.Component<{}> {
  @observable currentNodeData: Object;
  @observable loading: boolean = true;
  timer: IntervalID;

  async componentDidMount() {
    await this.getCurrentGraphData();
    this.loading = false;

    this.timer = setInterval(this.getCurrentGraphData, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  @computed
  get currentBlockchain() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentBlockchain;
  }

  getCurrentGraphData = async () => {
    // $FlowFixMe
    await this.props.rootStore.graphStore.getCurrentGraphData();
  };

  onClickNode = (nodeId: number) => {
    // $FlowFixMe
    this.currentNodeData = this.props.rootStore.graphStore.graphData.nodes.find(
      x => x.id === Number(nodeId),
    );
  };

  render() {
    return (
      <Row gutter={8}>
        <Col span={18}>
          <Card title="All Nodes">
            <Skeleton loading={this.loading}>
              <Graph
                id="graph-id"
                onClickNode={this.onClickNode}
                // $FlowFixMe
                data={this.props.rootStore.graphStore.graphData}
                config={myConfig}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={6}>
          <CurrentNode currentNodeData={this.currentNodeData} />
          <NodeAddress />
        </Col>
      </Row>
    );
  }
}

export default MonitoringComponent;
