// @flow
import * as React from 'react';
import { computed } from 'mobx';
import FlexView from 'react-flexview';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Card } from 'antd';

import { set } from 'utils/chainName';
import WizardForm from 'components/Forms/Wizard';
import ExistingNode from 'components/Forms/Existing';
import { launchDaemon, getBlockchains, connectToAdminNode } from 'api/wizard';

@inject('rootStore')
@observer
class WizardContainer extends React.Component<{
  type: string,
  chains: Array,
  walletAddress: string,
}> {
  constructor() {
    super();
    this.state = {
      chains: [],
      walletAddress: '',
      redirect_monitoring: false,
    };
    this.getchains = this.getchains.bind(this);
  }

  @computed
  get currentStep() {
    // $FlowFixMe
    return this.props.rootStore.rootState.wizard.currentStep;
  }

  componentDidMount() {
    this.getchains();
  }

  getchains() {
    getBlockchains().then(({ data }) => {
      let chains = data['blockchains'];
      this.setState({ chains: chains });
    });
  }

  handleAdminAddressChange(event) {
    this.setState({ title: event.target.value });
  }

  showAlert(chain) {
    const success = set('chainName', chain);
    let blockchainName = chain;
    launchDaemon({ blockchainName }).then(({ data }) => {});
    this.setState({ redirect_monitoring: true }, () => {
      if (success) {
        this.props.rootStore.rootState.currentBlockchain = blockchainName;
      }
    });
  }

  generateAddress(nodeAddress) {
    let adminNodeAddress = nodeAddress;

    connectToAdminNode({ adminNodeAddress }).then(({ data }) => {
      console.log(data);
      let wa = data.walletAddress;
      this.setState({ walletAddress: wa });
      this.getchains();
    });
  }

  render() {
    const { chains } = this.state;
    const { type } = this.props;
    const { walletAddress } = this.state;

    if (this.state.redirect_monitoring) {
      return <Redirect to="/welcome" />;
    }

    if (type === 'existing') {
      return (
        <Card>
          <FlexView
            column
            vAlignContent="center"
            hAlignContent="center"
            height="50%"
          >
            <ExistingNode
              chains={chains}
              walletAddress={walletAddress}
              title={this.state.title}
              onconnectexisting={chain => this.showAlert(chain)}
              generateAddress={nodeAddress => this.generateAddress(nodeAddress)}
              handleAdminAddressChange={event =>
                this.handleAdminAddressChange(event)
              }
            />
          </FlexView>
        </Card>
      );
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
