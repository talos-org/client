// @flow
import * as React from 'react';
import { Modal, Input } from 'antd';

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
        okText="Add"
        onCancel={onCancel}
      >
        <label>Node address</label>
        <Input
          name="name"
          onChange={this.handleNameChange}
          placeholder="Enter new node address"
          value={name}
          title="Identifier of 26-39 alphanumeric characters, beginning with the number 1 or 3 and does not contain letters O, l, I, or the number 0"
          style={{ marginBottom: '10px' }}
          required
          pattern="^[13][a-km-zA-HJ-NP-Z1-9]{26,39}$"
        />
      </Modal>
    );
  }
}
