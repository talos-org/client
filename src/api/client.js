// @flow
import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL
  ? `http://${process.env.REACT_APP_BASE_URL}:5000/api`
  : 'http://localhost:5000/api';

const getClient = (baseURL = URL) => {
  const options = {
    baseURL,
  };

  const client = axios.create(options);

  return client;
};

class APIClient {
  constructor(baseURL = URL) {
    this.client = getClient(baseURL);
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { APIClient };
