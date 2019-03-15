// @flow
import isOnline from 'is-online';
import { observable, when } from 'mobx';

import RootStore from 'stores/RootStore';

export default class ApplicationStore {
  @observable connected: boolean;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    // $FlowFixMe
    when(async () => await isOnline(), () => (this.connected = true));

    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  // $FlowFixMe
  handleConnectionChange = event => {
    if (event.type === 'offline') {
      this.connected = false;
    }

    if (event.type === 'online') {
      this.connected = true;
    }
  };
}

// notify(
//         'warning',
//         'No internet',
//         'An active internet connection is required for full functionality of the app',
//       );

// notify(
//         'info',
//         'Connected to the internet',
//         '🚂 You’re good to go!',
//       );
