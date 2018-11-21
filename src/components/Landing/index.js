// @flow
import * as React from 'react';
import { Box } from '@rebass/grid';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
import rem from '../../utils/rem';

const Button = styled.div`
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  background: #40a9ff;
  border-radius: 3px;
  color: #fff;
  padding: ${rem(17)} ${rem(22)};
  text-align: center;
  &:hover {
    background: #fff;
    border: 2px solid #40a9ff;
    color: #40a9ff;
  }
`;

const Container = styled(Box)`
  margin: 0 auto;
`;

export default class WelcomeComponent extends React.Component<{}> {
  render() {
    return (
      <Container width={1 / 2}>
        <Logo />
        <Button>
          <StyledLink to="/onboarding/existing">
            Connect to existing blockchain
          </StyledLink>
        </Button>
        <Divider>or</Divider>
        <StyledLink to="/onboarding/existing">Create new blockchain</StyledLink>
      </Container>
    );
  }
}
