// @flow
import * as React from 'react';
import { Modal } from 'antd';
import Differ from 'react-differ';

export default class DataItemDiffModal extends React.Component<
  {
    visible: boolean,
    onClose: Function,
    oldItem: Object,
    newItem: Object,
  },
  {},
> {
  constructor() {
    super();
  }

  formatDateTime = timeMs => {
    return new Date(timeMs * 1000).toLocaleString('en-US', {
      timeZone: 'America/Toronto',
    });
  };

  prettyPrintJson = json => {
    return JSON.stringify(JSON.parse(json), null, 2);
  };

  render() {
    const { visible, onClose, oldItem, newItem } = this.props;

    return (
      <Modal
        title={
          (oldItem &&
            `Item changes from ${this.formatDateTime(
              oldItem.time,
            )} to ${this.formatDateTime(newItem.time)}`) ||
          `Item created on ${this.formatDateTime(newItem.time)}`
        }
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        {((!oldItem || oldItem.data.json !== newItem.data.json) && (
          <Differ
            from={(oldItem && this.prettyPrintJson(oldItem.data.json)) || ''}
            to={this.prettyPrintJson(newItem.data.json)}
          />
        )) ||
          'No changes'}
      </Modal>
    );
  }
}
