// @flow
import * as React from 'react';
import { Button, Form, Input, Slider } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import mock from 'api/mock';
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
    return this.props.rootStore.blockchainStore.description;
  }

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
  get name() {
    // $FlowFixMe
    return this.props.rootStore.blockchainStore.name;
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
                      blockchainName,
                      description,
                      maxBlockSize,
                      miningDiversity,
                      miningTurnover,
                      targetBlockTime,
                    } = values;
                    // TODO: Find a better way to do this. This looks horrid.
                    this.props.rootStore.blockchainStore.description = description;
                    this.props.rootStore.blockchainStore.maxBlockSize = maxBlockSize;
                    this.props.rootStore.blockchainStore.miningDiversity = miningDiversity;
                    this.props.rootStore.blockchainStore.miningTurnover = miningTurnover;
                    this.props.rootStore.blockchainStore.name = blockchainName;
                    this.props.rootStore.blockchainStore.targetBlockTime = targetBlockTime;
                    const success = set('chainName', blockchainName);
                    this.setState({ loading: false }, () => {
                      if (success) {
                        // $FlowFixMe
                        this.props.rootStore.rootState.currentBlockchain = blockchainName;
                        // TODO: Maybe we can avoid this? I don’t know, don’t have time to think
                        // about this right now.
                        // $FlowFixMe
                        this.props.history.push('/');
                      }
                    });
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
              placeholder="Give your Blockchain a description"
            />,
          )}
        </Form.Item>
        <Form.Item label="Maximum block size">
          {getFieldDecorator('maxBlocksize', {
            initialValue: String(this.maxBlockSize),
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
            Finish
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default StepReview;
