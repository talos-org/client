// @flow
import * as React from 'react';
import { Modal, Table, Checkbox, Button, Form, Input } from 'antd';

export default class AddNodeModal extends React.Component<
  {
    visible: boolean,
    confirmLoading: boolean,
    onOk: Function,
    onCancel: Function,
  },
  {
    selected: Array,
    rescan: boolean,
  },
> {
  constructor() {
    super();
    this.state = {
      selected: null,
      rescan: false,
    };
  }

  onOk = () => {
    const selected = this.state.selected;
    this.props.onOk(
      localStorage.getItem('chainName'),
      selected ? selected.map(s => s.name) : [],
      this.state.rescan,
    );
  };

  toggleRescan = e => {
    const rescan = e.target.checked;
    this.setState({ rescan });
  };

  render() {
    const { visible, confirmLoading, onCancel, form } = this.props;
    const { disabled, loading, validateStatus } = this.state;
    const { TextArea } = Input;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selected: selectedRows });
      },
      getCheckboxProps: record => ({
        name: record.name,
      }),
    };

    return (
      <Modal
        title="Connect a New Node"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <Form layout="horizontal">
          <Form.Item label="Address">
            <TextArea
              autosize={{ minRows: 2, maxRows: 2 }}
              placeholder="Enter new node address"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
