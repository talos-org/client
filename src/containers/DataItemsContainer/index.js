// @flow
import * as React from 'react';
import { Alert, Table, Button } from 'antd';
import axios from 'axios';
import DataItemEditorContainer from '../../containers/DataItemEditorContainer';
import { Link, Switch, Route } from 'react-router-dom';

const URL = process.env.REACT_APP_BASE_URL
  ? `http://${process.env.REACT_APP_BASE_URL}:5000/api`
  : 'http://localhost:5000/api';

export default class DataItemsContainer extends React.Component<
  {
    match: Object,
    location: Object,
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
      keys: [],
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
        `${URL}/data/get_stream_keys?blockchainName=${blockchainName}&streamName=${streamName}&count=999999&start=-999999`,
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
