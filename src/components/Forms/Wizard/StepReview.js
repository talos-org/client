// @flow
import * as React from 'react';
import { Button, Form, Icon, Input } from 'antd';
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
    return this.props.rootStore.blockchainStore.description;
  }

  @computed
  get maxBlockSize() {
    return this.props.rootStore.blockchainStore.maxBlockSize;
  }

  @computed
  get miningDiversity() {
    return this.props.rootStore.blockchainStore.miningDiversity;
  }

  @computed
  get miningTurnover() {
    return this.props.rootStore.blockchainStore.miningTurnover;
  }

  @computed
  get name() {
    return this.props.rootStore.blockchainStore.name;
  }

  @computed
  get targetBlockTime() {
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
                        this.props.rootStore.rootState.currentBlockchain = blockchainName;
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
            rules: [
              {
                required: true,
                message: 'A blockchain name is required',
              },
            ],
          })(
            <Input
              placeholder="Name your blockchain"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />,
          )}
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
            initialValue: this.maxBlockSize,
          })(<Input placeholder="Maximum block size" />)}
        </Form.Item>
        <Form.Item label="Mining diversity">
          {getFieldDecorator('miningDiversity', {
            initialValue: this.miningDiversity,
          })(<Input placeholder="Mining diversity" />)}
        </Form.Item>
        <Form.Item label="Mining turnover">
          {getFieldDecorator('miningTurnover', {
            initialValue: this.miningTurnover,
          })(<Input placeholder="Maximum block size" />)}
        </Form.Item>
        <Form.Item label="Target block time">
          {getFieldDecorator('targetBlockTime', {
            initialValue: this.targetBlockTime,
          })(<Input placeholder="Target time" />)}
        </Form.Item>
        <Form.Item>
          {/* Previous button does nothing right now */}
          <Button>Previous</Button>
          <Button loading={loading} onClick={onValidateForm} type="primary">
            Finish
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default StepReview;
