// @flow
import * as React from 'react';
import { Alert, Table, Button, Popconfirm } from 'antd';
import axios from 'axios';
import AddNodeModal from '../Modals/AddNodeModal.js';
import { Switch, Route } from 'react-router-dom';

export default class AdminContainer extends React.Component<
  {
    match: Object,
    location: Object,
  },
  {
    error: string,
    nodes: Array,
    addModalState: Object,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null,
      nodes: [],
      addModalState: { visible: false, confirmLoading: false },
    };
  }

  componentDidMount() {
    this.getNodes();
  }

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  getPermissions = () => {};

  reloadData = (callback = () => {}) => {
    this.getNodes(callback);
  };

  getNodes(callback = () => {}) {
    const blockchainName = localStorage.getItem('chainName');
    return axios
      .get(
        `http://35.196.26.90:5000/api/permissions/get_permissions?blockchainName=${blockchainName}&permissions=connect&verbose=false`,
      )
      .then(response => {
        let nodes = response.data.permissions;
        this.setState({ nodes }, () => callback());
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: error.toString() });
      });
  }

  componentDidMount() {
    this.getNodes();
  }

  onOkAddModal = (blockchainName, newNodeAddress) => {
    const addModalState = {
      visible: true,
      confirmLoading: true,
    };
    this.setState({ addModalState }, () => {
      this.addNode(blockchainName, newNodeAddress);
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

  addNode = (blockchainName, newNodeAddress) => {
    const addModalState = {
      visible: false,
      confirmLoading: false,
    };
    let error = null;

    return axios
      .post('http://35.196.26.90:5000/api/nodes/add_node', {
        blockchainName,
        newNodeAddress,
      })
      .then(response => {
        console.log('Node Added:', response);
      })
      .catch(error => {
        console.error('Error:', error);
        error = error.toString();
      })
      .then(() => {
        this.setState({ addModalState });
      });
  };

  removeNode = (blockchainName, address) => {
    let error = null;
    var addresses = [];
    addresses.push(address);
    var permissions = [];
    permissions.push('connect');

    return axios
      .post(
        'http://35.196.26.90:5000/api/permissions/revoke_global_permission',
        {
          blockchainName,
          addresses,
          permissions,
        },
      )
      .then(response => {
        console.log('Permission Revoked:', response);
      })
      .catch(error => {
        console.error('Error:', error);
        error = error.toString();
      })
      .then(() => {
        this.setState({ error });
      });
  };

  render() {
    const { error, addModalState, nodes } = this.state;
    const { match } = this.props;
    const { path } = match;

    const columns = [
      {
        title: 'Node Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Permissions',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Remove Node',
        key: 'remove',
        render: (text, record) => (
          <span>
            <Popconfirm
              title={`Are you sure you wish to remove this node from the network '${
                record.address
              }'?`}
              onConfirm={() => {
                this.removeNode(
                  localStorage.getItem('chainName'),
                  new Array(record.address),
                );
              }}
            >
              {/* eslint-disable-next-line */}
              <a href="javascript:">Remove Node</a>
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
              <Table columns={columns} dataSource={nodes} />
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
