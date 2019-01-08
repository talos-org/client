// @flow
import * as React from 'react';
import { Card, Steps } from 'antd';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';

import StepConfigure from 'components/Forms/Wizard/StepConfigure';
import StepSetup from 'components/Forms/Wizard/StepSetup';
import StepReview from 'components/Forms/Wizard/StepReview';

const { Step } = Steps;

const FormHoF = (currentStep: number) => {
  switch (currentStep) {
    case 0:
      return <StepConfigure />;
    case 1:
      return <StepSetup />;
    case 2:
      return <StepReview />;
    default:
      return <StepConfigure />;
  }
};

@withRouter
@inject('rootStore')
@observer
class WizardForm extends React.Component<
  { currentStep: number },
  {
    // Used to redirect user to the dashboard
    redirectToReferrer: boolean,
  },
> {
  state = {
    redirectToReferrer: false,
  };

  render() {
    const { currentStep } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/" />;
    } else {
      return (
        <Card bordered={false}>
          <Steps current={currentStep} direction="horizontal">
            <Step title="Configure blockchain" />
            <Step title="Setup blockchain" />
            <Step title="Review information" />
          </Steps>
          <React.Fragment>{FormHoF(currentStep)}</React.Fragment>
        </Card>
      );
    }
  }
}

export default WizardForm;
