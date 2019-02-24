// @flow
import * as React from 'react';
import { Box, Flex, Text } from 'rebass';
import { Button } from 'antd';
import { computed } from 'mobx';
import { Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { ButtonGroup, Container } from './index.styles';
import { Logo, LogoInverted } from 'components/ui/Logo';

@withRouter
@inject('rootStore')
@observer
class WelcomeComponent extends React.Component<{}> {
  @computed
  get connected() {
    // $FlowFixMe
    return this.props.rootStore.applicationStore.connected;
  }

  @computed
  get currentBlockchain() {
    // $FlowFixMe
    return this.props.rootStore.rootState.currentBlockchain;
  }

  handleExisting = () => {
    // $FlowFixMe
    this.props.history.push('/wizard/existing');
  };

  handleNew = () => {
    // $FlowFixMe
    this.props.history.push('/wizard/new');
  };

  render() {
    if (this.currentBlockchain) {
      return <Redirect to="/" />;
    } else {
      return (
        <Container>
          <Box
            p={{
              sm: 3,
              md: 4,
              lg: 5,
            }}
            width={1}
            color="white"
            bg="brightBlue"
          >
            <Logo />
            <Text
              fontSize={{
                sm: 4,
                md: 6,
                lg: 6,
              }}
              letterSpacing={{
                md: '-1px',
                lg: '-2px',
              }}
              mt={5}
              py={{
                sm: 4,
                md: 4,
                lg: 4,
              }}
            >
              A configurable platform for developing and deploying blockchains
            </Text>
            <Button default ghost>
              Learn more
            </Button>
          </Box>
          <Box
            p={{
              sm: 3,
              md: 4,
              lg: 5,
            }}
            width={1}
            color="deepBlue"
            bg="white"
          >
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              mx={{ lg: 6 }}
              my={{ lg: 6 }}
            >
              <LogoInverted />
              <ButtonGroup
                mt={{
                  md: 5,
                  lg: 5,
                }}
              >
                <Button
                  block
                  disabled={!this.connected}
                  onClick={this.handleExisting}
                >
                  Connect to existing blockchain
                </Button>
                <Button
                  block
                  disabled={!this.connected}
                  onClick={this.handleNew}
                >
                  Create new blockchain
                </Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </Container>
      );
    }
  }
}

export default WelcomeComponent;
