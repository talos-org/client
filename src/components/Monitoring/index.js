// @flow
import * as React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { computed, observable } from 'mobx';
import { Graph } from 'react-d3-graph';
import { inject, observer } from 'mobx-react';

import CurrentNode from 'components/Monitoring/CurrentNode';

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
class MonitoringComponent extends React.Component<{}, { loading: boolean }> {
  @observable currentNodeData: Object;
  @observable data: Object;
  @observable inactiveNodes: Array<string>;
  @observable loading: boolean = true;

  async componentDidMount() {
    await this.props.rootStore.graphStore.getCurrentGraphData();
    setInterval(this.getCurrentGraphData, 5000);

    this.loading = false;
  }

  @computed
  get currentBlockchain() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentBlockchain;
  }

  getCurrentGraphData = async () => {
    await this.props.rootStore.graphStore.getCurrentGraphData();
  };

  onClickNode = (nodeId: number) => {
    this.currentNodeData = this.data.nodes.find(x => x.id === Number(nodeId));
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
                data={this.props.rootStore.graphStore.data}
                config={myConfig}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col span={6}>
          <CurrentNode currentNodeData={this.currentNodeData} />
          {/* <InactiveNodes /> */}
        </Col>
      </Row>
    );
  }
}

export default MonitoringComponent;
