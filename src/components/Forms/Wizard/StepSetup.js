// @flow
import * as React from 'react';
import { Button, Form, Input, Slider } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
@Form.create()
class StepSetup extends React.Component<
  {},
  {
    loading: boolean,
  },
> {
  state = {
    loading: false,
  };

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
        if (!error) {
          this.setState({ loading: true }, () => {
            const {
              maxBlockSize,
              miningDiversity,
              miningTurnover,
              targetBlockTime,
            } = values;
            this.props.rootStore.currentBlockchainStore.set(
              'maxBlockSize',
              maxBlockSize,
            );
            this.props.rootStore.currentBlockchainStore.set(
              'miningDiversity',
              miningDiversity,
            );
            this.props.rootStore.currentBlockchainStore.set(
              'miningTurnover',
              miningTurnover,
            );
            this.props.rootStore.currentBlockchainStore.set(
              'targetBlockTime',
              targetBlockTime,
            );
            this.props.rootStore.rootState.wizard.currentStep++;
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
        <Form.Item label="Maximum block size (in bytes)">
          {getFieldDecorator('maxBlockSize', {
            initialValue: this.maxBlockSize,
          })(<Input placeholder="Maximum block size" />)}
        </Form.Item>
        <Form.Item label="Mining diversity">
          {getFieldDecorator('miningDiversity', {
            initialValue: this.miningDiversity,
          })(<Slider max={1.0} min={0.1} step={0.1} />)}
        </Form.Item>
        <Form.Item label="Mining turnover">
          {getFieldDecorator('miningTurnover', {
            initialValue: this.miningTurnover,
          })(<Slider max={1.0} min={0.1} step={0.1} />)}
        </Form.Item>
        <Form.Item label="Target block time (in seconds)">
          {getFieldDecorator('targetBlockTime', {
            initialValue: this.targetBlockTime,
          })(<Input placeholder="Target block time" />)}
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            onClick={handlePrevious}
            style={{ marginRight: '5px' }}
          >
            Previous
          </Button>
          <Button loading={loading} onClick={onValidateForm} type="primary">
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default StepSetup;
