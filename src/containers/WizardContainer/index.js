// @flow
import * as React from 'react';
import { computed } from 'mobx';
import axios from 'axios';
import FlexView from 'react-flexview';
import { inject, observer } from 'mobx-react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { Button, Form, Input, Card, Row, Col } from 'antd';
import { observable } from 'mobx';

import mock from 'api/mock';
import { set } from 'utils/chainName';

import WizardForm from 'components/Forms/Wizard';
import Logo from 'components/ui/Logo';
import { link } from 'fs';

import { createChain, launchDaemon } from 'api/wizard';

const list = [];

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
    fetch('http://localhost:5000/api/configuration/get_blockchains')
      .then(response => {
        return response.json();
      })
      .then(data => {
        let chains = data['blockchains'];

        this.setState({ chains: chains });
      });
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  showAlert(chain) {
    const success = set('chainName', chain);
    axios
      .post('http://localhost:5000/api/configuration/deploy_chain', {
        blockchainName: chain,
      })
      .then(response => {
        console.log(response);
      });
    this.setState({ redirect_monitoring: true }, () => {
      if (success) {
        this.props.rootStore.rootState.currentBlockchain = chain;
      }
    });
  }

  generateAddress(nodeAddress) {
    axios
      .post('http://localhost:5000/api/nodes/connect_to_admin_node', {
        adminNodeAddress: nodeAddress,
      })
      .then(response => {
        let wa = response.data.walletAddress;
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
            <Form layout="horizontal" hAlignContent="right">
              <h1>Blockchains on the current network</h1>
              <div className="Demo" style={{ marginBottom: '2em' }}>
                <Row gutter={16}>
                  {chains.map((chain, id) => (
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{ paddingTop: '8px', paddingBottom: '8px' }}
                    >
                      <div className="gutter-box">
                        <Button
                          key={id}
                          onClick={() => this.showAlert(chain)}
                          name={chain}
                          title={`Connect to ${chain}`}
                          type="primary"
                          style={{ width: '100%' }}
                        >
                          <div
                            style={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {chain}
                          </div>
                        </Button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <h1>Connect to new blockchain network</h1>
              <Form.Item hasFeedback label="Admin Node Address">
                <Input
                  placeholder="Enter Admin Node Address"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
              <Button
                name="connectToNew"
                type="primary"
                onClick={() => this.generateAddress(this.state.title)}
                hAlignContent="center"
              >
                Generate Wallet Address
              </Button>
            </Form>
            <h2>Wallet Address: {walletAddress}</h2>
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
