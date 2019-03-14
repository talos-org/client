// @flow
import * as React from 'react';
import { Card, Steps } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import StepConfigure from 'components/Forms/Wizard/StepConfigure';
import StepSetup from 'components/Forms/Wizard/StepSetup';
import StepReview from 'components/Forms/Wizard/StepReview';

const { Step } = Steps;

@withRouter
@inject('rootStore')
@observer
class WizardForm extends React.Component<{ currentStep: number }> {
  // TODO: don't route based on mobx state, route based on url & keep urls updated?
  // → /wizard/new/configure, /wizard/new/setup, /wizard/new/review
  formHoC = (currentStep: number) => {
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

  render() {
    const { currentStep } = this.props;

    return (
      <Card>
        <Steps current={currentStep} direction="horizontal">
          <Step title="Configure blockchain" />
          <Step title="Setup blockchain" />
          <Step title="Review information" />
        </Steps>
        <React.Fragment>{this.formHoC(currentStep)}</React.Fragment>
      </Card>
    );
  }
}

export default WizardForm;
