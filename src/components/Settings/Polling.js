// @flow
import * as React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Button, Form, Input, message, List, Switch } from 'antd';

@inject('rootStore')
@observer
@Form.create()
class GeneralSettings extends React.Component<{}> {
  @action
  handleNotificationsChange = (checked: boolean, event: Event) => {
    // $FlowFixMe
    this.props.rootStore.settingsStore.toggleNetworkLossNotifications();
  };

  @action
  handlePollingChanges = (checked: boolean, event: Event) => {
    console.log('[checked]', checked);
    // $FlowFixMe
    this.props.rootStore.settingsStore.togglePolling();
  };

  @computed
  get polling() {
    // $FlowFixMe
    return this.props.rootStore.settingsStore.polling;
  }

  @computed
  get sideMenuCollapsed() {
    // $FlowFixMe
    return this.props.rootStore.globalHeaderStore.sidebarCollapsed;
  }

  getData = () => {
    const toggleNotifications = (
      <Switch
        checkedChildren="← OFF"
        defaultChecked={this.polling}
        onChange={this.handlePollingChanges}
        unCheckedChildren="ON →"
      />
    );

    return [
      {
        title: 'Poll the server for changes*',
        description:
          '*We recommend that you do not tweak this setting, as it may have unintended side-effects',
        actions: [toggleNotifications],
      },
    ];
  };

  render() {
    // $FlowFixMe
    const { getFieldDecorator, validateFields } = this.props.form;

    const onValidateForm = event => {
      event.preventDefault();
      validateFields((error, { pollingTime }) => {
        if (!error) {
          // $FlowFixMe
          this.props.rootStore.settingsStore.pollingTime = pollingTime;
          message.success('Updated successfully');
        }
      });
    };

    return (
      <React.Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Form onSubmit={onValidateForm}>
          <Form.Item>
            {getFieldDecorator('pollingTime', {
              initialValue: this.props.rootStore.settingsStore.pollingTime,
              rules: [{ required: true, message: 'This field is required' }],
            })(
              <Input
                allowClear
                onChange={onValidateForm}
                placeholder="Enter a value (in milliseconds)"
              />,
            )}
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export default GeneralSettings;
