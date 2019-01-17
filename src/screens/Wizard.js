// @flow
import * as React from 'react';
import { Layout } from 'antd';

import WizardContainer from 'containers/WizardContainer';

const { Content } = Layout;

class Wizard extends React.Component<{}> {
  render() {
    const {
      // $FlowFixMe
      match: {
        params: { type },
      },
    } = this.props;
    return (
      <Layout>
        <Content>
          <WizardContainer type={type} />
        </Content>
      </Layout>
    );
  }
}

export default Wizard;
