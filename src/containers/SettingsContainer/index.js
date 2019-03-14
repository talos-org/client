// @flow
import * as React from 'react';
import { Box } from 'rebass';
// $FlowFixMe
import { Menu, PageHeader, Typography } from 'antd';

import { Container } from './index.styles';
import GeneralSettings from 'components/Settings/General';
import PollingSettings from 'components/Settings/Polling';

const { Item } = Menu;
const { Paragraph } = Typography;

class SettingsContainer extends React.Component<{}> {
  handleSelect = ({
    item,
    key,
    selectedKeys,
  }: {
    item: string,
    key: string,
    selectedKeys: string[],
  }) => {
    // TODO: To be implemented
  };

  render() {
    return (
      <Container>
        <Box width={[1 / 4, 1 / 4, 1 / 4]}>
          <Menu
            selectedKeys={['application']}
            mode="inline"
            onSelect={this.handleSelect}
          >
            <Item key="application">General Settings</Item>
          </Menu>
        </Box>
        <Box mx={[3, 4, 6]} width={1}>
          <PageHeader title="General Settings">
            <Paragraph>
              These settings will be remembered the next time you launch the
              application
            </Paragraph>
            <GeneralSettings />
          </PageHeader>
          <PageHeader title="Polling Settings">
            <Paragraph>
              These settings will be remembered the next time you launch the
              application
            </Paragraph>
            <PollingSettings />
          </PageHeader>
        </Box>
      </Container>
    );
  }
}

export default SettingsContainer;
