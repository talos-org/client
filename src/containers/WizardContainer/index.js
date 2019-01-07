// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import RootStore from 'stores/RootStore';
import WizardForm from 'components/Forms/Wizard';

@inject('rootStore')
@observer
class WizardContainer extends React.Component<{ type: string }> {
  rootStore: RootStore;

  render() {
    const { type } = this.props;

    if (type === 'existing') {
      // I’m not even sure what the requirements are for
      // an existing blockchain.
      // So for now, I’m just going to redirect to /wizard/new
      return <Redirect to="/wizard/new" />;
    } else {
      return (
        <WizardForm
          currentStep={this.props.rootStore.rootState.wizard.currentStep}
        />
      );
    }
  }
}

export default WizardContainer;
