// @flow
import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import { createChain, doesBlockchainExist } from 'api/wizard';
import { notify } from 'components/ui/Notification';

const { TextArea } = Input;

@inject('rootStore')
@observer
@Form.create()
class StepConfigure extends React.Component<
  {},
  {
    disabled: boolean,
    loading: boolean,
    validateStatus: 'success' | 'warning' | 'error' | 'validating' | '',
  },
> {
  @observable inputEnabled = true;
  @observable isDirty: boolean = false;
  state = {
    disabled: true,
    loading: false,
    validateStatus: '',
  };

  // $FlowFixMe
  checkIfBlockchainExists = (rules, value, callback) => {
    // $FlowFixMe
    const {
      form: { isFieldTouched },
    } = this.props;
    this.setState({ validateStatus: 'validating' });
    if (isFieldTouched('blockchainName')) {
      if (!value) {
        this.setState({ validateStatus: 'error' }, () => {
          callback('A blockchain name is required');
        });
      } else {
        this.inputEnabled = false;
        this.setState({ disabled: true });

        doesBlockchainExist(value)
          .then(({ data: { status } }) => {
            this.setState({ validateStatus: 'success' }, () => {
              this.inputEnabled = true;
              this.setState({ disabled: false }, () => {
                callback(status);
              });
            });
          })
          .catch(error => {
            this.setState({ validateStatus: 'error' }, () => {
              this.inputEnabled = true;
              if (error.message === 'Network Error') {
                callback(`Something went wrong. Please try again`);
              } else {
                callback(
                  `The blockchain name ${value} is taken. Try another one`,
                );
              }
            });
          });
      }
    }
  };

  render() {
    // $FlowFixMe
    const { form } = this.props;
    const { validateFields } = form;
    const { getFieldDecorator } = form;
    const { disabled, loading, validateStatus } = this.state;

    const validateForm = () => {
      this.setState({ loading: true }, () => {
        validateFields((error, { blockchainName, blockchainDescription }) => {
          // Can ignore the error here because validation is done
          // externally
          this.setState({ loading: true }, () => {
            // $FlowFixMe
            this.props.rootStore.currentBlockchainStore.set(
              'name',
              blockchainName,
            );
            // $FlowFixMe
            this.props.rootStore.currentBlockchainStore.set(
              'description',
              blockchainDescription,
            );

            createChain({ blockchainName }).then(({ data: { status } }) => {
              this.setState({ loading: false }, () => {
                notify('success', status);
                // $FlowFixMe
                this.props.rootStore.rootState.wizard.currentStep++;
              });
            });
          });
        });
      });
    };

    return (
      <Form layout="horizontal">
        <Form.Item
          hasFeedback
          label="Blockchain name"
          validateStatus={validateStatus}
        >
          {getFieldDecorator('blockchainName', {
            // $FlowFixMe
            initialValue: this.props.rootStore.currentBlockchainStore.get(
              'name',
            ),
            rules: [
              {
                validator: this.checkIfBlockchainExists,
              },
            ],
            validateTrigger: 'onBlur',
          })(
            <Input
              disabled={!this.inputEnabled}
              placeholder="Name your blockchain"
            />,
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('blockchainDescription', {
            initialValue: '',
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="Give your Blockchain a description"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            disabled={disabled}
            loading={loading}
            onClick={validateForm}
            type="primary"
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default StepConfigure;
