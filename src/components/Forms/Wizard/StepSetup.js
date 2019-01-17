// @flow
import * as React from 'react';
import { Button, Form, Input, Slider } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import mock from 'api/mock';

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
    return this.props.rootStore.blockchainStore.maxBlockSize;
  }

  @computed
  get miningDiversity() {
    // $FlowFixMe
    return this.props.rootStore.blockchainStore.miningDiversity;
  }

  @computed
  get miningTurnover() {
    // $FlowFixMe
    return this.props.rootStore.blockchainStore.miningTurnover;
  }

  @computed
  get targetBlockTime() {
    // $FlowFixMe
    return this.props.rootStore.blockchainStore.targetBlockTime;
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
            mock.then(t => {
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (t) {
                    const {
                      maxBlockSize,
                      miningDiversity,
                      miningTurnover,
                      targetBlockTime,
                    } = values;
                    this.props.rootStore.blockchainStore.maxBlockSize = maxBlockSize;
                    this.props.rootStore.blockchainStore.miningDiversity = miningDiversity;
                    this.props.rootStore.blockchainStore.miningTurnover = miningTurnover;
                    this.props.rootStore.blockchainStore.targetBlockTime = targetBlockTime;
                    this.props.rootStore.rootState.wizard.currentStep++;
                  }
                }, 1500);
              });
            });
          });
        }
      });
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
          <Button loading={loading} onClick={onValidateForm} type="primary">
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default StepSetup;
