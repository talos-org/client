// @flow
import * as React from 'react';
import { computed } from 'mobx';
import FlexView from 'react-flexview';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import WizardForm from 'components/Forms/Wizard';

@inject('rootStore')
@observer
class WizardContainer extends React.Component<{ type: string }> {
  @computed
  get currentStep() {
    // $FlowFixMe
    return this.props.rootStore.rootState.wizard.currentStep;
  }

  render() {
    const { type } = this.props;

    if (type === 'existing') {
      // I’m not even sure what the requirements are for
      // an existing blockchain.
      // So for now, I’m just going to redirect to /wizard/new
      return <Redirect to="/wizard/new" />;
    } else {
      return (
        <FlexView
          column
          vAlignContent="center"
          hAlignContent="center"
          height="100%"
        >
          <WizardForm currentStep={this.currentStep} />
        </FlexView>
      );
    }
  }
}

export default WizardContainer;
