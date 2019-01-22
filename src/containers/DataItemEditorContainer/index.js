// @flow
import * as React from 'react';
import {
  Alert,
  Button,
  Divider,
  Popconfirm,
  Input,
  Card,
  Avatar,
  List,
  Icon,
} from 'antd';
import axios from 'axios';
import SubscribeStreamModal from '../../components/Modals/SubscribeStreamModal';
import CreateStreamModal from '../../components/Modals/CreateStreamModal';
import ReactJson from 'react-json-view';
import { Link, Redirect, Switch, Route } from 'react-router-dom';

export default class DataItemEditorContainer extends React.Component<
  {
    match: object,
    location: object,
  },
  {
    error: string,
    latestItem: object,
    latestItemJson: object,
    key: string,
    jsonData: object,
    itemHistory: Array,
    redirect: boolean,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null /* error message from REST call */,
      itemHistory: [],
      latestItem: null,
      latestItemJson: {},
      key: '',
      jsonData: {},
      redirect: false,
    };
  }

  componentDidMount() {
    this.getDataItemsByKey(
      localStorage.getItem('chainName'),
      this.props.match.params.stream,
      this.props.match.params.key,
    );
  }

  getDataItemsByKey(blockchainName, streamName, key) {
    if (key !== 'New Key') {
      axios
        .get(
          `http://localhost:5000/api/get_items_by_key?blockchainName=${blockchainName}&streamName=${streamName}&key=${key}`,
        )
        .then(response => {
          console.log('Items:', response);

          let dataItems = response.data.Data;
          let latestItem = null;
          let latestItemJson = {};
          let jsonData = {};
          let itemHistory = [];

          if (dataItems.length > 0) {
            latestItem = dataItems.pop();
            itemHistory = dataItems.reverse();
            jsonData = JSON.parse(latestItem.data.json);
            latestItemJson = jsonData; // save copy of data before its edited by user, used to know when to disable 'Save' button
          }

          this.setState({
            latestItem,
            latestItemJson,
            key,
            jsonData,
            itemHistory,
          });
        })
        .catch(error => {
          console.error('Error:', error);
          this.setState({ error: error.toString() });
        });
    }
  }

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  handleKeyChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onEditJSON = edit => {
    const jsonData = edit.updated_src;
    console.log(jsonData);
    this.setState({ jsonData });
  };

  onSaveData = () => {
    if (this.state.key !== '') {
      axios
        .post('http://localhost:5000/api/publish_item', {
          blockchainName: localStorage.getItem('chainName'),
          streamName: this.props.match.params.stream,
          keys: new Array(this.state.key),
          data: this.state.jsonData,
          verbose: 'true',
        })
        .then(response => {
          console.log('Data posted:', response);
          const redirect = true;
          this.setState({ redirect });
        })
        .catch(error => {
          console.error('Error:', error);
          this.setState({ error: error.toString() });
        });
    } else {
      let error = 'Data item key cannot be empty!';
      this.setState({ error });
    }
  };

  formatDateTime = timeMs => {
    return new Date(timeMs * 1000).toLocaleString('en-US', {
      timeZone: 'America/Toronto',
    });
  };

  render() {
    const {
      error,
      latestItem,
      latestItemJson,
      key,
      jsonData,
      itemHistory,
      redirect,
    } = this.state;
    const { match, location } = this.props;
    const { path, params } = match;

    console.log(itemHistory);

    if (redirect) {
      this.setState({ redirect: false });

      return <Redirect to={`/data/${match.params.stream}/${key}`} />;
    }

    return (
      <div>
        <span>Key</span>
        <Input
          name="key"
          onChange={this.handleKeyChange}
          placeholder="Enter a new key name for this item"
          value={key}
          disabled={params.key !== 'New Key'}
          style={{ marginBottom: '10px', color: 'black', cursor: 'auto' }}
        />
        <Card title="Data">
          <Card.Grid style={{ width: '70%', fontSize: '1.5em' }}>
            <ReactJson
              src={jsonData}
              onEdit={this.onEditJSON}
              onAdd={this.onEditJSON}
              onDelete={this.onEditJSON}
              name={false}
            />
          </Card.Grid>
          <Card.Grid style={{ width: '30%' }}>
            Last updated: {latestItem && this.formatDateTime(latestItem.time)}
          </Card.Grid>
          <Card.Grid style={{ width: '30%' }}>
            By: {latestItem && latestItem.publishers}
          </Card.Grid>
          <Card.Grid style={{ width: '30%' }}>
            <Button onClick={() => {}} disabled={itemHistory.length === 0}>
              <Icon type="diff" />
              View diff to previous version
            </Button>
          </Card.Grid>
        </Card>
        <Button
          onClick={this.onSaveData}
          disabled={JSON.stringify(latestItemJson) === JSON.stringify(jsonData)}
          style={{ marginTop: '10px' }}
        >
          Save
        </Button>
        <Divider orientation="left">History</Divider>
        <List
          itemLayout="horizontal"
          dataSource={itemHistory}
          renderItem={item => (
            <List.Item>
              {
                <List.Item.Meta
                  avatar={<Avatar icon="file-text" />}
                  title="Edited"
                  description={`${this.formatDateTime(item.time)} by ${
                    item.publishers
                  }`}
                />
              }
              <Button onClick={() => {}}>
                <Icon type="diff" />
              </Button>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
