// @flow
import * as React from 'react';
import { Alert, Table, Button, Divider, Popconfirm, Spin } from 'antd';
import { action, computed, observable } from 'mobx';
import axios from 'axios';
import AddNodeModal from '../Modals/AddNodeModal.js';
import { Link, Switch, Route } from 'react-router-dom';

export default class AdminContainer extends React.Component<
  {
    match: Object,
    location: Object,
  },
  {
    error: string,
    addModalState: Object,
    createModalState: Object,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null,
      addModalState: { visible: false, confirmLoading: false },
      createModalState: { visible: false, confirmLoading: false },
    };
  }

  componentDidMount() {
    this.getPermissions(localStorage.getItem('chainName'));
  }

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  removeNode = () => {};

  getPermissions = () => {};

  onOkAddModal = (blockchainName, nodeAddress, rescan) => {
    const addModalState = {
      visible: true,
      confirmLoading: true,
    };
    this.setState({ addModalState }, () => {
      this.addNode(blockchainName, nodeAddress, rescan);
    });
  };

  onCancelAddModal = () => {
    const addModalState = {
      visible: false,
      confirmLoading: false,
    };
    this.setState({ addModalState });
  };

  openAddModal = () => {
    const addModalState = {
      visible: true,
      confirmLoading: false,
    };
    this.setState({ addModalState });
  };

  addNode = (blockchainName, nodeAddress, isOpen) => {
    const createModalState = {
      visible: false,
      confirmLoading: false,
    };
    let error = null;

    return axios
      .post('http://localhost:5000/api/node/add_node', {
        blockchainName,
        nodeAddress,
        isOpen,
      })
      .then(response => {
        console.log('Node Added:', response);
      })
      .catch(error => {
        console.error('Error:', error);
        error = error.toString();
      })
      .then(() => {
        this.setState({ createModalState, error });
      });
  };

  onOkCreateModal = (blockchainName, nodeAddress, type) => {
    const createModalState = {
      visible: true,
      confirmLoading: true,
    };
    const isOpen = type === 'Open' ? 'true' : 'false';
    this.setState({ createModalState }, () => {
      this.addNode(blockchainName, nodeAddress, isOpen);
    });
  };

  onCancelCreateModal = () => {
    const createModalState = {
      visible: false,
      confirmLoading: false,
    };
    this.setState({ createModalState });
  };

  render() {
    const { error, addModalState, createModalState } = this.state;
    const { match } = this.props;
    const { path } = match;

    const columns = [
      {
        title: 'Node ID',
        dataIndex: 'nodeID',
        key: 'nodeID',
        render: text => <Link to={`${path}/${text}`}>{text}</Link>,
      },
      {
        title: 'Node Address',
        dataIndex: 'nodeAddress',
        key: 'nodeAddress',
      },
      {
        title: 'Permissions',
        key: 'modPerms',
        render: (text, record) => (
          <span>
            {record.restrict.write && (
              <span>
                {/* eslint-disable-next-line */}
                <a href="#">Edit Permissions</a>
                <Divider type="vertical" />
              </span>
            )}
            <Popconfirm
              title={`Are you sure you wish to remove this node from the network '${
                record.name
              }'?`}
              onConfirm={() => {
                this.removeNode(
                  localStorage.getItem('chainName'),
                  new Array(record.name),
                );
              }}
            >
              {/* eslint-disable-next-line */}
              <a href="#">Modify Permissions</a>
            </Popconfirm>
          </span>
        ),
      },
      {
        title: 'Remove Node',
        key: 'remove',
        render: (text, record) => (
          <span>
            {record.restrict.write && (
              <span>
                {/* eslint-disable-next-line */}
                <a href="#">Edit Permissions</a>
                <Divider type="vertical" />
              </span>
            )}
            <Popconfirm
              title={`Are you sure you wish to remove this node from the network '${
                record.name
              }'?`}
              onConfirm={() => {
                this.removeNode(
                  localStorage.getItem('chainName'),
                  new Array(record.name),
                );
              }}
            >
              {/* eslint-disable-next-line */}
              <a href="#">Remove Node</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <div>
              {error && (
                <Alert
                  message="An error occurred"
                  description={error}
                  type="error"
                  closable
                  onClose={this.onCloseAlert}
                />
              )}
              <h1>Connected Nodes</h1>
              <Table columns={columns} />
              <h1>Add New Node to Network</h1>

              <Button onClick={this.openAddModal}>Add</Button>
              <AddNodeModal
                visible={addModalState.visible}
                confirmLoading={addModalState.confirmLoading}
                onOk={this.onOkAddModal}
                onCancel={this.onCancelAddModal}
              />
            </div>
          )}
        />
      </Switch>
    );
  }
}
