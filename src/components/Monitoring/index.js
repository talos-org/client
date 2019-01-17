// @flow
import * as React from 'react';
import { Card, Col, Layout, Row } from 'antd';
import { Graph } from 'react-d3-graph';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import CurrentNode from 'components/Monitoring/CurrentNode';
import _data from './data';

const { Content } = Layout;

const makeData = () => {
  const data = {
    nodes: [],
    links: [],
    focusedNodeId: 1,
  };

  _data.forEach(d => {
    data.nodes.push(d);
    data.links.push({ source: 1, target: d.id });
  });

  return data;
};

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue',
  },
  link: {
    highlightColor: 'lightblue',
  },
};

@observer
class MonitoringComponent extends React.Component<{}> {
  @observable currentNodeData;
  @observable data;

  constructor() {
    super();
    this.data = makeData();
    this.onClickNode = this.onClickNode.bind(this);
  }

  onClickNode = nodeId => {
    this.currentNodeData = this.data.nodes.find(x => x.id === Number(nodeId));
  };

  render() {
    return (
      <Layout>
        <Content>
          <Row gutter={8}>
            <Col span={18}>
              <Card title="All Nodes">
                <Graph
                  id="graph-id"
                  onClickNode={this.onClickNode}
                  data={this.data}
                  config={myConfig}
                />
              </Card>
            </Col>
            <Col span={6}>
              <CurrentNode currentNodeData={this.currentNodeData} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default MonitoringComponent;
