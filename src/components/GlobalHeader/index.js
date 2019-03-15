// @flow
import * as React from 'react';
import { Col, Icon, Layout, Row } from 'antd';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import CurrentBlockchain from 'components/GlobalHeader/CurrentBlockchain';
import RightContent from 'components/GlobalHeader/RightContent';

const { Header } = Layout;

@inject('rootStore')
@observer
class GlobalHeader extends React.Component<{}> {
  @computed
  get sidebarCollapsed() {
    // $FlowFixMe
    return this.props.rootStore.globalHeaderStore.sidebarCollapsed;
  }

  @action
  toggle = () => {
    // $FlowFixMe
    this.props.rootStore.globalHeaderStore.toggleSideMenu();
  };

  render() {
    return (
      <Header style={{ background: '#fefefe', padding: 0 }}>
        <Row>
          <Col span={8}>
            <Icon
              onClick={this.toggle}
              style={{ fontSize: '22px', padding: '22px 24px' }}
              type={this.sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </Col>
          <Col span={8}>
            <CurrentBlockchain />
          </Col>
          <Col span={8}>
            <RightContent />
          </Col>
        </Row>
      </Header>
    );
  }
}

export default GlobalHeader;
