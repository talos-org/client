// @flow
import * as React from 'react';
import { Card, Steps, Alert } from 'antd';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';

import StepConfigure from 'components/Forms/Wizard/StepConfigure';
import StepSetup from 'components/Forms/Wizard/StepSetup';
import StepReview from 'components/Forms/Wizard/StepReview';

const { Step } = Steps;

@withRouter
@inject('rootStore')
@observer
class WizardForm extends React.Component<
  { currentStep: number },
  {
    // Used to redirect user to the dashboard
    redirectToReferrer: boolean,
    error: string,
  },
> {
  state = {
    redirectToReferrer: false,
    error: null,
  };

  onError = error => {
    this.setState({ error });
  };

  /* TODO: don't route based on mobx state, route based on url & keep urls updated?
  e.g. /wizard/new/configure, /wizard/new/setup, /wizard/new/review */
  FormHoC = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return <StepConfigure onError={this.onError} />;
      case 1:
        return <StepSetup onError={this.onError} />;
      case 2:
        return <StepReview onError={this.onError} />;
      default:
        return <StepConfigure onError={this.onError} />;
    }
  };

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  render() {
    const { currentStep } = this.props;
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/" />;
    } else {
      return (
        <Card>
          {error && (
            <Alert
              message="An error occurred"
              description={error}
              type="error"
              closable
              onClose={this.onCloseAlert}
              style={{ marginBottom: '10px' }}
            />
          )}
          <Steps current={currentStep} direction="horizontal">
            <Step title="Configure blockchain" />
            <Step title="Setup blockchain" />
            <Step title="Review information" />
          </Steps>
          <React.Fragment>{this.FormHoC(currentStep)}</React.Fragment>
        </Card>
      );
    }
  }
}

export default WizardForm;
