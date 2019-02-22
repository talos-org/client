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
    name: string,
    type: string,
  },
> {
  constructor() {
    super();
    this.state = {
      name: '',
      type: 'Open',
    };
  }

  onOk = () => {
    this.props.onOk(
      localStorage.getItem('chainName'),
      this.state.name,
      this.state.type,
    );
  };

  handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTypeChange = value => {
    this.setState({ type: value });
  };

  render() {
    const { name, type } = this.state;
    const { visible, confirmLoading, onCancel } = this.props;

    return (
      <Modal
        title="Create new stream"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <span>Name</span>
        <Input
          name="name"
          onChange={this.handleNameChange}
          placeholder="Name of stream"
          value={name}
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
