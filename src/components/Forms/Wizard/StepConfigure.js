// @flow
import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import mock from 'api/mock';

const { TextArea } = Input;

@inject('rootStore')
@observer
@Form.create()
class StepConfigure extends React.Component<
  {},
  {
    disabled: boolean,
    isDirty: boolean,
    loading: boolean,
    validateStatus: 'success' | 'warning' | 'error' | 'validating' | '',
  },
> {
  @observable isDirty: boolean = false;
  state = {
    disabled: true,
    isDirty: false,
    loading: false,
    validateStatus: '',
  };

  constructor(props: any) {
    super(props);
    this.checkIfBlockchainExists = this.checkIfBlockchainExists.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  // $FlowFixMe
  checkIfBlockchainExists = (rules, value, callback) => {
    setTimeout(() => {
      if (!value && this.isDirty) {
        this.setState({ validateStatus: 'error' }, () => {
          callback('error');
        });
      } else {
        // Try and create a blockchain here
        this.setState({ validateStatus: 'success' }, () => {
          this.setState({ disabled: false });
        });
      }
    }, 500);
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    this.isDirty = this.isDirty || !event.currentTarget.value;
    this.setState({ validateStatus: 'validating' });
  };

  validateForm = () => {
    this.setState({ loading: true }, () => {
      mock.then(t => {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (t) {
              this.props.rootStore.blockchainStore.name = document.querySelector(
                '#blockchainName',
              ).value;
              this.props.rootStore.blockchainStore.description = document.querySelector(
                '#blockchainDescription',
              ).value;
              this.props.rootStore.rootState.wizard.currentStep++;
            }
          }, 1500);
        });
      });
    });
  };

  render() {
    // $FlowFixMe
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { disabled, loading, validateStatus } = this.state;

    return (
      <Form layout="horizontal">
        <Form.Item
          hasFeedback
          label="Blockchain name"
          validateStatus={validateStatus}
        >
          {getFieldDecorator('blockchainName', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'A blockchain name is required',
                validator: this.checkIfBlockchainExists,
              },
            ],
            validateTrigger: 'onBlur',
          })(
            <Input
              onBlur={this.handleBlur}
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
            onClick={this.validateForm}
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
