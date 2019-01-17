// @flow
import * as React from 'react';
import { Button, Form, Input, Slider } from 'antd';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import mock from 'api/mock';
import { set } from 'utils/chainName';
import axios from 'axios';

const { TextArea } = Input;

@withRouter
@inject('rootStore')
@observer
@Form.create()
class StepReview extends React.Component<
  {
    onError: Function,
  },
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
    const { form, onError } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { loading } = this.state;

    const onValidateForm = () => {
      validateFields((error, values) => {
        if (!error) {
          this.setState({ loading: true }, () => {
            axios
              .post('http://localhost:5000/api/create_chain', {
                blockchainName: this.name,
              })
              .then(response =>
                console.log('Successfully created chain:', response),
              )
              .then(() =>
                axios.post('http://localhost:5000/api/config_parameters', {
                  blockchainName: this.name,
                  params: {
                    description: this.description,
                    max_block_size: this.maxBlockSize,
                    target_block_time: this.targetBlockTime,
                    mining_turnover: this.miningTurnover,
                    mining_diversity: this.miningDiversity,
                  },
                }),
              )
              .then(response => {
                console.log('Successfully configured chain:', response);
                // TODO: Find a better way to do this. This looks horrid.
                this.props.rootStore.blockchainStore.description = this.description;
                this.props.rootStore.blockchainStore.maxBlockSize = this.maxBlockSize;
                this.props.rootStore.blockchainStore.miningDiversity = this.miningDiversity;
                this.props.rootStore.blockchainStore.miningTurnover = this.miningTurnover;
                this.props.rootStore.blockchainStore.name = this.name;
                this.props.rootStore.blockchainStore.targetBlockTime = this.targetBlockTime;
                const success = set('chainName', this.name);
                this.setState({ loading: false }, () => {
                  if (success) {
                    // $FlowFixMe
                    this.props.rootStore.rootState.currentBlockchain = this.name;
                    // TODO: Maybe we can avoid this? I don’t know, don’t have time to think
                    // about this right now.
                    // $FlowFixMe
                    this.props.history.push('/');
                  }
                });
              })
              .catch(error => {
                console.error('Error:', error);
                this.setState({ loading: false }, () =>
                  onError(error.toString()),
                );
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
