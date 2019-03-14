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
  },
> {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  onOk = () => {
    this.props.onOk(localStorage.getItem('chainName'), this.state.name);
  };

  handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name } = this.state;
    const { visible, confirmLoading, onCancel } = this.props;

    return (
      <Modal
        title="Add a new node"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <span>Node</span>
        <Input
          name="name"
          onChange={this.handleNameChange}
          placeholder="Enter new node address"
          value={name}
          style={{ marginBottom: '10px' }}
        />
      </Modal>
    );
  }
}
