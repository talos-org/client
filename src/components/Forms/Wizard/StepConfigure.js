// @flow
import * as React from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import mock from 'api/mock';
import RootStore from 'stores/RootStore';

const { TextArea } = Input;

@inject('rootStore')
@observer
@Form.create()
class StepConfigure extends React.Component<
  {},
  {
    loading: boolean,
  },
> {
  rootStore: RootStore;
  state = {
    loading: false,
  };

  render() {
    // $FlowFixMe
    const { form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { loading } = this.state;

    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          this.setState({ loading: true }, () => {
            mock.then(t => {
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (t) {
                    this.props.rootStore.blockchainStore.name =
                      values.blockchainName;
                    this.props.rootStore.blockchainStore.description =
                      values.blockchainDescription;
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
        <Form.Item label="Blockchain name">
          {getFieldDecorator('blockchainName', {
            initialValue: '',
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
            initialValue: '',
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="Give your Blockchain a description"
            />,
          )}
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

export default StepConfigure;
