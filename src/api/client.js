// @flow
import axios from 'axios';

import type { Axios, AxiosPromise } from 'axios';

const URL = process.env.REACT_APP_BASE_URL
  ? `http://${process.env.REACT_APP_BASE_URL}:5000/api`
  : 'http://localhost:5000/api';

const getClient = (baseURL: string = URL) => {
  const options = {
    baseURL,
  };

  const client: Axios = axios.create(options);

  return client;
};

class APIClient {
  client: Axios;

  constructor(baseURL: string = URL) {
    this.client = getClient(baseURL);
  }

  delete(url: string, conf: Object = {}): AxiosPromise<Object> {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  get(url: string, conf: Object = {}): AxiosPromise<Object> {
    return this.client
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(
    url: string,
    data: Object = {},
    conf: Object = {},
  ): AxiosPromise<Object> {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url: string, data: Object = {}, conf: Object = {}): AxiosPromise<Object> {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { APIClient };
