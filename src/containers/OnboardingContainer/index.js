// @flow
import * as React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Alert, Icon, Steps as _Steps } from 'antd';
import HeaderTitle from 'components/HeaderTitle/index';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Form from 'components/Forms/Onboarding/index';

export const Steps = styled(_Steps)`
  top: 240px;
  position: sticky;
`;

const { Step } = Steps;

// TODO: Need to change this up drastically. This is nasty.
export default class OnboardingContainer extends React.Component<
  { type: string },
  {
    current: number,
    done: boolean,
    error: string,
  },
> {
  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {
      current: 0,
      done: false /* used to indicate we are done onboarding, redirects user to main dashboard */,
      error: null /* error message from REST call */,
    };
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  onUpdate = () => {
    this.next();
  };

  onFinishNew = (name, params) => {
    axios
      .post('http://localhost:5000/create_chain/', {
        name: name,
      })
      .then(response => console.log('Successfully created chain:', response))
      .then(() =>
        axios.post('http://localhost:5000/config_parameters/', {
          name: name,
          params: params,
        }),
      )
      .then(response => {
        console.log('Successfully configured chain:', response);
        localStorage.setItem('chainName', name);
        this.setState({ done: true });
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: error.toString() });
      });
  };

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  previous = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current, done, error } = this.state;
    const { type } = this.props;

    if (done) {
      return <Redirect to="/" />;
    }

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
              {error && (
                <Alert
                  message="An error occurred"
                  description={error}
                  type="error"
                  closable
                  onClose={this.onCloseAlert}
                />
              )}
              <Form onUpdate={this.onUpdate} onFinish={this.onFinishNew} />
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
