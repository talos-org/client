// @flow
import * as React from 'react';

import { Col, Icon, Layout, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import RootStore from 'stores/RootStore';

import Blockchain from './Blockchain';

const { Header } = Layout;

@inject('rootStore')
@observer
class GlobalHeader extends React.Component<{}> {
  rootStore: RootStore;

  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.rootState = this.rootStore.rootState;
  }

  toggle = () => {
    const { globalHeaderStore } = this.rootStore;
    globalHeaderStore.toggleSideMenu();
  };

  render() {
    return (
      <Header style={{ background: '#fefefe', padding: 0 }}>
        <Row>
          <Col span={8}>
            <Icon
              onClick={this.toggle}
              style={{ fontSize: '22px', padding: '22px 24px' }}
              type={
                this.rootState.sidebarCollapsed ? 'menu-unfold' : 'menu-fold'
              }
            />
          </Col>
          <Col span={12}>
            <Blockchain />
          </Col>
          <Col span={4}>
            <div>Logout</div>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default GlobalHeader;
