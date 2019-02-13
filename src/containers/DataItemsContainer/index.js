// @flow
import * as React from 'react';
import { Alert, Table, Button, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import DataItemEditorContainer from '../../containers/DataItemEditorContainer';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

export default class DataItemsContainer extends React.Component<
  {
    match: object,
    location: object,
    onEditCallback: Function,
  },
  {
    error: string,
    keys: Array,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null /* error message from REST call */,
      keys: new Array(),
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData = (callback = () => {}) => {
    this.getStreamKeys(
      localStorage.getItem('chainName'),
      this.props.match.params.stream,
      callback,
    );
  };

  getStreamKeys(blockchainName, streamName, callback = () => {}) {
    axios
      .get(
        `http://localhost:5000/api/get_stream_keys?blockchainName=${blockchainName}&streamName=${streamName}`,
      )
      .then(response => {
        const keys = response.data.reverse();
        this.setState({ keys }, () => callback());
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

  render() {
    const { error, keys } = this.state;
    const { match, location, onEditCallback } = this.props;
    const { path, params } = match;

    const columns = [
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
        render: text => <Link to={`${location.pathname}/${text}`}>{text}</Link>,
      },
      {
        title: 'Last Publisher',
        dataIndex: 'last.publishers',
        key: 'publisher',
      },
      {
        title: 'Last Modified',
        dataIndex: 'last.time',
        key: 'time',
        render: text =>
          new Date(text * 1000).toLocaleString('en-US', {
            timeZone: 'America/Toronto',
          }),
      },
      {
        title: 'Versions',
        dataIndex: 'items',
        key: 'versions',
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
              <h1>{`Data for '${params.stream}' Stream`}</h1>
              <Table columns={columns} dataSource={keys} />
              <Link to={`${location.pathname}/New Key`}>
                <Button onClick={() => {}}>Add Key</Button>
              </Link>
            </div>
          )}
        />
        <Route
          path={`${path}/:key`}
          render={props => (
            <DataItemEditorContainer
              {...props}
              onEditCallback={() => this.reloadData(onEditCallback)}
            />
          )}
        />
      </Switch>
    );
  }
}
