// @flow
import * as React from 'react';
import { Layout } from 'antd';

import WelcomeContainer from 'containers/WelcomeContainer';

const { Content } = Layout;

export default () => (
  <Layout>
    <Content>
      <WelcomeContainer />
    </Content>
  </Layout>
);
