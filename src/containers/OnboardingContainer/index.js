// @flow
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Icon, Steps as _Steps } from 'antd';
import HeaderTitle from 'components/HeaderTitle/index';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Form from 'components/Forms/Onboarding/index';

export const Steps = styled(_Steps)`
  top: 240px;
  position: sticky;
`;

const { Step } = Steps;

// TODO: Need to change this up drastically. This is nasty.
export default class OnboardingContainer extends React.Component<
  { type: string },
  { current: number },
> {
  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {
      current: 0,
    };
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  onUpdate = () => {
    this.next();
  };

  previous = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    const { type } = this.props;

    if (type === 'existing') {
      // I’m not even sure what the requirements are for
      // an existing blockchain.
      // So for now, I’m just going to redirect to /onboarding/new
      return <Redirect to="/onboarding/new" />;
    } else if (type === 'new') {
      return (
        <Container>
          <Row>
            <Col md={2}>
              <Steps current={current} direction="vertical">
                <Step title="Name" icon={<Icon type="form" />} />
                <Step title="Configure" icon={<Icon type="setting" />} />
                <Step title="Review" icon={<Icon type="red-envelope" />} />
              </Steps>
            </Col>
            <Col md={10}>
              <HeaderTitle />
              <Form onUpdate={this.onUpdate} />
              <Link to="/">tmp link to main dashboard</Link>
            </Col>
          </Row>
        </Container>
      );
    } else {
      // You should in no way be able to get here,
      // but end-users are end-users and some of them
      // can get curious and try to access unknown routes.
      // This is to avoid that. This, however, needs to be addressed
      // at a larger scale.
      // The right way to do this is to match `exact` routes and
      // RR4 will handle the rest and _should_ redirect to 404
      // TODO: Create issue about 404's and redirects on GH
      return <Redirect to="/404" />;
    }
  }
}
