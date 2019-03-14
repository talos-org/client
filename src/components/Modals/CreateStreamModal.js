// @flow
import * as React from 'react';
import { Modal, Input, Select } from 'antd';

const Option = Select.Option;

export default class CreateStreamModal extends React.Component<
  {
    visible: boolean,
    confirmLoading: boolean,
    onOk: Function,
    onCancel: Function,
  },
  {
    address: string,
    type: string,
  },
> {
  constructor() {
    super();
    this.state = {
      address: '',
      type: 'Open',
    };
  }

  onOk = () => {
    this.props.onOk(
      localStorage.getItem('chainName'),
      this.state.address,
      this.state.type,
    );
  };

  handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.address]: event.target.value });
  };

  render() {
    const { address, type } = this.state;
    const { visible, confirmLoading, onCancel } = this.props;

    return (
      <Modal
        title="Create new stream"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.onOk}
        okText="Create"
        onCancel={onCancel}
      >
        <span>Name</span>
        <Input
          address="address"
          onChange={this.handleNameChange}
          placeholder="Name of stream"
          value={address}
          style={{ marginBottom: '10px' }}
        />
        <span>Type</span>
        <br />
        <Select
          style={{ width: '30%' }}
          value={type}
          onChange={this.handleTypeChange}
        >
          <Option value="Open">Open</Option>
          <Option value="Restricted">Restricted</Option>
        </Select>
      </Modal>
    );
  }
}
