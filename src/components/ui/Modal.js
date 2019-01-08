// @flow
import * as React from 'react';
import { Modal } from 'antd';

type PropsModal = {
  children?: React.Node,
  confirmLoading: boolean,
  onCancel: Function,
  onOk: Function,
  title: string,
  visible: boolean,
};

export default ({
  children,
  confirmLoading,
  onCancel,
  onOk,
  title,
  visible,
}: PropsModal) => {
  return (
    <Modal
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      visible={visible}
    >
      {children}
    </Modal>
  );
};
