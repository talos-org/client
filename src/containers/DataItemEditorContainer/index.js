// @flow
import * as React from 'react';
import { Alert, Table, Button, Divider, Popconfirm, Input } from 'antd';
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
    dataItems: Array,
    latestItem: object,
    key: string,
    jsonData: object,
    redirect: boolean,
  },
> {
  constructor() {
    super();
    this.state = {
      error: null /* error message from REST call */,
      dataItems: [],
      latestItem: null,
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
        .post('http://localhost:5000/api/get_items_by_key/', {
          blockchainName,
          streamName,
          key,
          verbose: 'true',
        })
        .then(response => {
          console.log('Items:', response);

          let dataItems = response.data.Data;
          let latestItem = null;
          let jsonData = {};
          dataItems.forEach(item => {
            if (!latestItem || latestItem.time < item.time) {
              latestItem = item;
            }
          });

          if (latestItem) {
            jsonData = JSON.parse(latestItem.data.json);
          }

          this.setState({ dataItems, latestItem, key, jsonData });
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
        .post('http://localhost:5000/api/publish_item/', {
          blockchainName: localStorage.getItem('chainName'),
          streamName: this.props.match.params.stream,
          keys: [this.state.key],
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

  render() {
    const {
      error,
      dataItems,
      latestItem,
      key,
      jsonData,
      redirect,
    } = this.state;
    const { match, location } = this.props;
    const { path, params } = match;

    console.log(dataItems);

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
          style={{ marginBottom: '10px' }}
        />
        <ReactJson
          src={jsonData}
          onEdit={this.onEditJSON}
          onAdd={this.onEditJSON}
          onDelete={this.onEditJSON}
          name={false}
        />
        <Button onClick={this.onSaveData} style={{ marginTop: '10px' }}>
          Save
        </Button>
      </div>
    );
  }
}
