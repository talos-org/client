// @flow
import * as React from 'react';
import { Alert, Table, Button, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import SubscribeStreamModal from '../../components/Modals/SubscribeStreamModal';
import CreateStreamModal from '../../components/Modals/CreateStreamModal';
import DataItemsContainer from '../../containers/DataItemsContainer';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

export default class DataContainer extends React.Component<
  {
    match: object,
    location: object,
  },
  {
    error: string,
    subscribed: array,
    unsubscribed: array,
    subscribeModalState: object,
    createModalState: object,
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
    };
  }

  componentDidMount() {
    this.getStreams(localStorage.getItem('chainName'));
  }

  getStreams(blockchainName) {
    axios
      .get(
        `http://localhost:5000/api/get_streams?blockchainName=${blockchainName}`,
      )
      .then(response => {
        let subscribed = [];
        let unsubscribed = [];
        console.log('Streams:', response);

        let streams = response.data.Data;
        streams.forEach(stream => {
          if (stream.subscribed) {
            subscribed.push(stream);
          } else {
            unsubscribed.push(stream);
          }
        });
        this.setState({ subscribed, unsubscribed });
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: error.toString() });
      });
  }

  unsubscribeFromStreams(blockchainName, streams) {
    axios
      .post('http://localhost:5000/api/unsubscribe', {
        blockchainName,
        streams,
      })
      .then(response => {
        console.log('Unsubscribed:', response);
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

  onOkSubModal = (blockchainName, streams) => {
    const subscribeModalState = {
      visible: true,
      confirmLoading: true,
    };
    this.setState({ subscribeModalState }, () => {
      if (streams.length > 0) {
        axios
          .post('http://localhost:5000/api/subscribe', {
            blockchainName,
            streams,
          })
          .then(response => {
            const subscribeModalState = {
              visible: false,
              confirmLoading: false,
            };
            console.log('Subscribed:', response);
            this.setState({ subscribeModalState }, () => {
              this.getStreams(blockchainName);
            });
          })
          .catch(error => {
            const subscribeModalState = {
              visible: false,
              confirmLoading: false,
            };
            console.error('Error:', error);
            this.setState({ subscribeModalState, error: error.toString() });
          });
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

  onOkCreateModal = (blockchainName, streamName, type) => {
    const createModalState = {
      visible: true,
      confirmLoading: true,
    };
    const isOpen = type === 'Open' ? 'true' : 'false';
    this.setState({ createModalState }, () => {
      axios
        .post('http://localhost:5000/api/create_stream', {
          blockchainName,
          streamName,
          isOpen,
        })
        .then(response => {
          const createModalState = {
            visible: false,
            confirmLoading: false,
          };
          console.log('Created:', response);
          this.setState({ createModalState }, () => {
            this.getStreams(blockchainName);
          });
        })
        .catch(error => {
          const createModalState = {
            visible: false,
            confirmLoading: false,
          };
          console.error('Error:', error);
          this.setState({ createModalState, error: error.toString() });
        });
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
    const {
      error,
      subscribed,
      unsubscribed,
      subscribeModalState,
      createModalState,
    } = this.state;
    const { match, location } = this.props;
    const { path } = match;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <Link to={`${path}/${text}`}>{text}</Link>,
      },
      {
        title: 'Creators',
        dataIndex: 'creators',
        key: 'name',
      },
      {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
      },
      {
        title: 'Keys',
        dataIndex: 'keys',
        key: 'keys',
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
                <a href="#">Edit Permissions</a>
                <Divider type="vertical" />
              </span>
            )}
            <Popconfirm
              title={`Unsubscribe from stream '${record.name}'?`}
              onConfirm={() => {
                this.unsubscribeFromStreams(
                  localStorage.getItem('chainName'),
                  new Array(record.name),
                );
              }}
            >
              <a href="#">Unsubscribe</a>
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
            </div>
          )}
        />
        <Route path={`${path}/:stream`} component={DataItemsContainer} />
      </Switch>
    );
  }
}
