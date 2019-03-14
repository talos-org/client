// @flow
import * as React from 'react';
import { Alert, Table, Button, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import SubscribeStreamModal from '../../components/Modals/SubscribeStreamModal';
import CreateStreamModal from '../../components/Modals/CreateStreamModal';
import EditStreamPermissionsModal from '../../components/Modals/EditStreamPermissionsModal';
import DataItemsContainer from '../../containers/DataItemsContainer';
import { Link, Switch, Route } from 'react-router-dom';

export default class DataContainer extends React.Component<
  {
    match: Object,
    location: Object,
  },
  {
    error: string,
    subscribed: Array,
    unsubscribed: Array,
    subscribeModalState: Object,
    createModalState: Object,
    permissionsModalState: Object,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null /* error message from REST call */,
      subscribed: null,
      unsubscribed: null,
      subscribeModalState: { visible: false, confirmLoading: false },
      createModalState: { visible: false, confirmLoading: false },
      permissionsModalState: {
        streamName: null,
        streamPermissions: [],
        visible: false,
        confirmLoading: false,
      },
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData = (callback = () => {}) => {
    this.getStreams(localStorage.getItem('chainName'), callback);
  };

  getStreams(blockchainName, callback = () => {}) {
    return axios
      .get(
        `http://localhost:5000/api/data_streams/get_streams?blockchainName=${blockchainName}&count=999999&start=-999999`,
      )
      .then(response => {
        let subscribed = [];
        let unsubscribed = [];
        let streams = response.data;
        streams.forEach(stream => {
          if (stream.subscribed) {
            subscribed.push(stream);
          } else {
            unsubscribed.push(stream);
          }
        });
        this.setState({ subscribed, unsubscribed }, () => callback());
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: error.toString() });
      });
  }

  unsubscribeFromStreams(streams) {
    const blockchainName = localStorage.getItem('chainName');

    return axios
      .post('http://localhost:5000/api/data_streams/unsubscribe', {
        blockchainName,
        streams,
      })
      .then(response => {
        this.getStreams(blockchainName);
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: error.toString() });
      });
  }

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  openSubModal = () => {
    const subscribeModalState = {
      visible: true,
      confirmLoading: false,
    };
    this.setState({ subscribeModalState });
  };

  subscribeToStreams = (blockchainName, streams, rescan) => {
    const subscribeModalState = {
      visible: false,
      confirmLoading: false,
    };
    let error = null;

    return axios
      .post('http://localhost:5000/api/data_streams/subscribe', {
        blockchainName,
        streams,
        rescan,
      })
      .then(response => {
        this.getStreams(blockchainName);
      })
      .catch(error => {
        console.error('Error:', error);
        error = error.toString();
      })
      .then(() => {
        this.setState({ subscribeModalState, error });
      });
  };

  onOkSubModal = (blockchainName, streams, rescan) => {
    const subscribeModalState = {
      visible: true,
      confirmLoading: true,
    };
    this.setState({ subscribeModalState }, () => {
      if (streams.length > 0) {
        this.subscribeToStreams(blockchainName, streams, rescan);
      } else {
        this.onCancelSubModal();
      }
    });
  };

  onCancelSubModal = () => {
    const subscribeModalState = {
      visible: false,
      confirmLoading: false,
    };
    this.setState({ subscribeModalState });
  };

  openCreateModal = () => {
    const createModalState = {
      visible: true,
      confirmLoading: false,
    };
    this.setState({ createModalState });
  };

  createStream = (blockchainName, streamName, isOpen) => {
    const createModalState = {
      visible: false,
      confirmLoading: false,
    };
    let error = null;

    return axios
      .post('http://localhost:5000/api/data_streams/create_stream', {
        blockchainName,
        streamName,
        isOpen,
      })
      .then(response => {
        this.subscribeToStreams(blockchainName, new Array(streamName), false);
      })
      .catch(error => {
        console.error('Error:', error);
        error = error.toString();
      })
      .then(() => {
        this.setState({ createModalState, error });
      });
  };

  openPermissionsModal = streamName => {
    const blockchainName = localStorage.getItem('chainName');

    axios
      .get(
        `http://localhost:5000/api/permissions/get_permissions?blockchainName=${blockchainName}&permissions=${streamName}.*&verbose=false`,
      )
      .then(response => {
        let permissionsMap = {};
        let permissions = response.data.permissions;
        permissions.forEach(p => {
          if (!permissionsMap.hasOwnProperty(p.address)) {
            permissionsMap[p.address] = {
              write: false,
              activate: false,
              admin: false,
            };
          }
          permissionsMap[p.address][p.type] = true;
        });
        const streamPermissions = Object.keys(permissionsMap).map(key => {
          return { address: key, permissions: permissionsMap[key] };
        });
        const permissionsModalState = {
          streamName,
          streamPermissions,
          visible: true,
          confirmLoading: false,
        };
        this.setState({ permissionsModalState });
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: error.toString() });
      });
  };

  updateStreamPermissions = (
    streamName,
    grantPermissions,
    revokePermissions,
  ) => {
    const permissionsModalState = {
      ...this.state.permissionsModalState,
      visible: false,
      confirmLoading: false,
    };
    const blockchainName = localStorage.getItem('chainName');
    let error = null;

    let promises = [];

    grantPermissions.forEach(p => {
      const address = p.address;
      const permission = p.permission;

      promises.push(
        axios.post(
          'http://localhost:5000/api/permissions/grant_stream_permission',
          {
            blockchainName,
            address,
            permission,
            streamName,
          },
        ),
      );
    });

    revokePermissions.forEach(p => {
      const address = p.address;
      const permission = p.permission;

      promises.push(
        axios.post(
          'http://localhost:5000/api/permissions/revoke_stream_permission',
          {
            blockchainName,
            address,
            permission,
            streamName,
          },
        ),
      );
    });

    return axios
      .all(promises)
      .catch(error => {
        console.error('Error:', error);
        error = error.toString();
      })
      .then(() => {
        this.setState({ permissionsModalState, error });
      });
  };

  onOkCreateModal = (blockchainName, streamName, type) => {
    const createModalState = {
      visible: true,
      confirmLoading: true,
    };
    const isOpen = type === 'Open' ? true : false;
    this.setState({ createModalState }, () => {
      this.createStream(blockchainName, streamName, isOpen);
    });
  };

  onCancelCreateModal = () => {
    const createModalState = {
      visible: false,
      confirmLoading: false,
    };
    this.setState({ createModalState });
  };

  onOkPermissionsModal = (streamName, grantPermissions, revokePermissions) => {
    const permissionsModalState = {
      ...this.state.permissionsModalState,
      visible: true,
      confirmLoading: true,
    };
    this.setState({ permissionsModalState }, () => {
      this.updateStreamPermissions(
        streamName,
        grantPermissions,
        revokePermissions,
      );
    });
  };

  onCancelPermissionsModal = () => {
    const permissionsModalState = {
      ...this.state.permissionsModalState,
      visible: false,
      confirmLoading: false,
    };
    this.setState({ permissionsModalState });
  };

  render() {
    const {
      error,
      subscribed,
      unsubscribed,
      subscribeModalState,
      createModalState,
      permissionsModalState,
    } = this.state;
    const { match } = this.props;
    const { path } = match;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <Link to={`${path}/${text}`}>{text}</Link>,
      },
      {
        title: 'Creator',
        dataIndex: 'creators',
        key: 'name',
      },
      {
        title: 'Keys',
        dataIndex: 'keys',
        key: 'keys',
      },
      {
        title: 'Versions',
        dataIndex: 'items',
        key: 'versions',
      },
      {
        title: 'Type',
        dataIndex: 'restrict.write',
        key: 'type',
        render: type => (type ? 'Restricted' : 'Open'),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            {record.restrict.write && (
              <span>
                {/* eslint-disable-next-line */}
                <a
                  href="javascript:"
                  onClick={() => this.openPermissionsModal(record.name)}
                >
                  Edit Permissions
                </a>
                <Divider type="vertical" />
              </span>
            )}
            <Popconfirm
              title={`Unsubscribe from stream '${record.name}'?`}
              onConfirm={() =>
                this.unsubscribeFromStreams(new Array(record.name))
              }
            >
              {/* eslint-disable-next-line */}
              <a href="javascript:">Unsubscribe</a>
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
              <h1>Subscribed Streams</h1>
              <Table columns={columns} dataSource={subscribed} />
              <h1>Stream Actions</h1>
              <Button
                style={{ marginRight: '10px' }}
                onClick={this.openSubModal}
              >
                Subscribe
              </Button>
              <Button onClick={this.openCreateModal}>Create</Button>
              <SubscribeStreamModal
                unsubscribed={unsubscribed}
                visible={subscribeModalState.visible}
                confirmLoading={subscribeModalState.confirmLoading}
                onOk={this.onOkSubModal}
                onCancel={this.onCancelSubModal}
              />
              <CreateStreamModal
                visible={createModalState.visible}
                confirmLoading={createModalState.confirmLoading}
                onOk={this.onOkCreateModal}
                onCancel={this.onCancelCreateModal}
              />
              <EditStreamPermissionsModal
                name={permissionsModalState.streamName}
                permissions={permissionsModalState.streamPermissions}
                visible={permissionsModalState.visible}
                confirmLoading={permissionsModalState.confirmLoading}
                onOk={this.onOkPermissionsModal}
                onCancel={this.onCancelPermissionsModal}
              />
            </div>
          )}
        />
        <Route
          path={`${path}/:stream`}
          render={props => (
            <DataItemsContainer {...props} onEditCallback={this.reloadData} />
          )}
        />
      </Switch>
    );
  }
}
