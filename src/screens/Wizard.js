// @flow
import * as React from 'react';
import { Layout } from 'antd';

import WizardContainer from 'containers/WizardContainer';

const { Content } = Layout;

class Wizard extends React.Component<{}> {
  render() {
    // $FlowFixMe
    const {
      match: {
        params: { type },
      },
    } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <WizardContainer type={type} />
        </Content>
      </Layout>
    );
  }
}

export default Wizard;
