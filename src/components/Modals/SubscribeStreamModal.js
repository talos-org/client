// @flow
import * as React from 'react';
import { Modal, Table, Checkbox } from 'antd';

export default class SubscribeStreamModal extends React.Component<
  {
    unsubscribed: Array,
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
    const { unsubscribed, visible, confirmLoading, onCancel } = this.props;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Creators',
        dataIndex: 'creators',
        key: 'creators',
      },
    ];

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
        title="Subscribe to streams"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={unsubscribed}
        />
        <Checkbox onChange={this.toggleRescan}>
          Rescan for old data items
        </Checkbox>
      </Modal>
    );
  }
}
