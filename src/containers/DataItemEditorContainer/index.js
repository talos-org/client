// @flow
import * as React from 'react';
import { Alert, Button, Divider, Input, Card, Avatar, List, Icon } from 'antd';
import axios from 'axios';
import DataItemDiffModal from '../../components/Modals/DataItemDiffModal';
import ReactJson from 'react-json-view';

export default class DataItemEditorContainer extends React.Component<
  {
    match: object,
    location: object,
    onEditCallback: Function,
  },
  {
    error: string,
    latestItem: object,
    latestItemJson: object,
    key: string,
    jsonData: object,
    itemHistory: Array,
    dataItemDiffModalVisible: boolean,
    dataItemDiffOldItem: Object,
    dataItemDiffNewItem: Object,
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
      dataItemDiffModalVisible: false,
      dataItemDiffOldItem: null,
      dataItemDiffNewItem: null,
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData = (callback = () => {}) => {
    this.getDataItemsByKey(
      localStorage.getItem('chainName'),
      this.props.match.params.stream,
      this.props.match.params.key,
      callback,
    );
  };

  getDataItemsByKey(blockchainName, streamName, key, callback = () => {}) {
    if (key !== 'New Key') {
      axios
        .get(
          `http://localhost:5000/api/get_items_by_key?blockchainName=${blockchainName}&streamName=${streamName}&key=${key}`,
        )
        .then(response => {
          let dataItems = response.data;
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

          this.setState(
            {
              latestItem,
              latestItemJson,
              key,
              jsonData,
              itemHistory,
            },
            () => callback(),
          );
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
    const { key, jsonData } = this.state;
    const { match, onEditCallback, history } = this.props;

    if (key !== '') {
      axios
        .post('http://localhost:5000/api/publish_item', {
          blockchainName: localStorage.getItem('chainName'),
          streamName: match.params.stream,
          keys: new Array(key),
          data: jsonData,
          verbose: 'true',
        })
        .then(response => {
          history.push(`/data/${match.params.stream}/${key}`);
          this.reloadData(onEditCallback);
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

  openDataItemDiff = (dataItemDiffOldItem, dataItemDiffNewItem) => {
    const dataItemDiffModalVisible = true;
    this.setState({
      dataItemDiffModalVisible,
      dataItemDiffOldItem,
      dataItemDiffNewItem,
    });
  };

  onCloseDataItemDiff = () => {
    const dataItemDiffModalVisible = false;
    const dataItemDiffOldItem = null;
    const dataItemDiffNewItem = null;
    this.setState({
      dataItemDiffModalVisible,
      dataItemDiffOldItem,
      dataItemDiffNewItem,
    });
  };

  onCloseAlert = () => {
    const error = null;
    this.setState({ error });
  };

  render() {
    const {
      error,
      latestItem,
      latestItemJson,
      key,
      jsonData,
      itemHistory,
      dataItemDiffModalVisible,
      dataItemDiffOldItem,
      dataItemDiffNewItem,
    } = this.state;
    const { match } = this.props;
    const { params } = match;

    return (
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
            <Button
              onClick={() => this.openDataItemDiff(itemHistory[0], latestItem)}
              disabled={itemHistory.length === 0}
            >
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
          renderItem={(item, i) => (
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
              <Button
                onClick={() => {
                  this.openDataItemDiff(
                    (itemHistory.length > i + 1 && itemHistory[i + 1]) || null,
                    itemHistory[i],
                  );
                }}
              >
                <Icon type="diff" />
              </Button>
            </List.Item>
          )}
        />
        {dataItemDiffNewItem && (
          <DataItemDiffModal
            visible={dataItemDiffModalVisible}
            onClose={this.onCloseDataItemDiff}
            oldItem={dataItemDiffOldItem}
            newItem={dataItemDiffNewItem}
          />
        )}
      </div>
    );
  }
}
