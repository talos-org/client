// @flow
import * as React from 'react';
import { Button, Form, Input, Slider } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { createChain, launchDaemon } from 'api/wizard';
import { set } from 'utils/chainName';

const { TextArea } = Input;

@withRouter
@inject('rootStore')
@observer
@Form.create()
class StepReview extends React.Component<
  {},
  {
    loading: boolean,
  },
> {
  state = {
    loading: false,
  };

  @computed
  get description() {
    // $FlowFixMe
    return this.props.rootStore.currentBlockchainStore.get('description');
  }

  @computed
  get maxBlockSize() {
    // $FlowFixMe
    return this.props.rootStore.currentBlockchainStore.get('maxBlockSize');
  }

  @computed
  get miningDiversity() {
    // $FlowFixMe
    return this.props.rootStore.currentBlockchainStore.get('miningDiversity');
  }

  @computed
  get miningTurnover() {
    // $FlowFixMe
    return this.props.rootStore.currentBlockchainStore.get('miningTurnover');
  }

  @computed
  get name() {
    // $FlowFixMe
    return this.props.rootStore.currentBlockchainStore.get('name');
  }

  @computed
  get targetBlockTime() {
    // $FlowFixMe
    return this.props.rootStore.currentBlockchainStore.get('targetBlockTime');
  }

  render() {
    // $FlowFixMe
    const { form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { loading } = this.state;

    const onValidateForm = () => {
      validateFields((error, values) => {
        const { blockchainName } = values;

        if (!error) {
          this.setState({ loading: true }, () => {
            createChain({ blockchainName }).then(({ data: { status } }) => {});

            launchDaemon({ blockchainName }).then(({ data }) => {
              this.setState({ loading: false }, () => {
                // $FlowFixMe
                this.props.rootStore.rootState.currentBlockchain = blockchainName;
                const success = set('chainName', blockchainName);
                if (success) {
                  // $FlowFixMe
                  this.props.history.push('/');
                }
              });
            });
          });
        }
      });
    };

    const handlePrevious = () => {
      // $FlowFixMe
      this.props.rootStore.rootState.wizard.currentStep--;
    };

    return (
      <Form layout="horizontal">
        <Form.Item label="Blockchain name">
          {getFieldDecorator('blockchainName', {
            initialValue: this.name,
          })(<Input disabled={true} placeholder="Name your blockchain" />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('blockchainDescription', {
            initialValue: this.description,
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              disabled={true}
              placeholder="Give your Blockchain a description"
            />,
          )}
        </Form.Item>
        <Form.Item label="Maximum block size">
          {getFieldDecorator('maxBlocksize', {
            initialValue: String(this.maxBlockSize),
          })(<Input disabled={true} placeholder="Maximum block size" />)}
        </Form.Item>
        <Form.Item label="Mining diversity">
          {getFieldDecorator('miningDiversity', {
            initialValue: this.miningDiversity,
          })(<Slider disabled={true} max={1.0} min={0.1} step={0.1} />)}
        </Form.Item>
        <Form.Item label="Mining turnover">
          {getFieldDecorator('miningTurnover', {
            initialValue: this.miningTurnover,
          })(<Slider disabled={true} max={1.0} min={0.1} step={0.1} />)}
        </Form.Item>
        <Form.Item label="Target block time (in seconds)">
          {getFieldDecorator('targetBlockTime', {
            initialValue: this.targetBlockTime,
          })(<Input disabled={true} placeholder="Target block time" />)}
        </Form.Item>
        <Form.Item>
          <Button onClick={handlePrevious} style={{ marginRight: '5px' }}>
            Previous
          </Button>
          <Button loading={loading} onClick={onValidateForm} type="primary">
            Finish
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default StepReview;
