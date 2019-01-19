// @flow
import * as React from 'react';
import { Alert, Table, Button, Divider, Popconfirm } from 'antd';
import axios from 'axios';
import SubscribeStreamModal from '../../components/Modals/SubscribeStreamModal';
import CreateStreamModal from '../../components/Modals/CreateStreamModal';
import DataItemEditorContainer from '../../containers/DataItemEditorContainer';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

export default class DataItemsContainer extends React.Component<
  {
    match: object,
    location: object,
  },
  {
    error: string,
    uniqueDataItems: Array,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null /* error message from REST call */,
      uniqueDataItems: [],
    };
  }

  componentDidMount() {
    this.getStreamItems(
      localStorage.getItem('chainName'),
      this.props.match.params.stream,
    );
  }

  getStreamItems(blockchainName, streamName) {
    axios
      .get(
        `http://localhost:5000/api/get_stream_items?blockchainName=${blockchainName}&streamName=${streamName}`,
      )
      .then(response => {
        console.log('Data items:', response);

        let uniqueData = {};
        let dataItems = response.data.Data;
        /* traverse data items backwards, later data items have latest timestamps */
        for (let i = dataItems.length - 1; i >= 0; i--) {
          let item = dataItems[i];
          let key = item.keys[0];
          if (!uniqueData.hasOwnProperty(key)) {
            uniqueData[key] = item;
          }
        }

        let uniqueDataItems = Object.values(uniqueData);
        this.setState({ uniqueDataItems });
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
    const { error, uniqueDataItems } = this.state;
    const { stream, match, location } = this.props;
    const { path, params } = match;

    const columns = [
      {
        title: 'Key',
        dataIndex: 'keys',
        key: 'keys',
        render: text => <Link to={`${location.pathname}/${text}`}>{text}</Link>,
      },
      {
        title: 'Publishers',
        dataIndex: 'publishers',
        key: 'publishers',
      },
      {
        title: 'Last Modified',
        dataIndex: 'time',
        key: 'time',
        render: text =>
          new Date(text * 1000).toLocaleString('en-US', {
            timeZone: 'America/Toronto',
          }),
      },
      {
        title: 'Confirmations',
        dataIndex: 'confirmations',
        key: 'confirmations',
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
              <Table columns={columns} dataSource={uniqueDataItems} />
              <Link to={`${location.pathname}/New Key`}>
                <Button onClick={() => {}}>Add Key</Button>
              </Link>
            </div>
          )}
        />
        <Route path={`${path}/:key`} component={DataItemEditorContainer} />
      </Switch>
    );
  }
}