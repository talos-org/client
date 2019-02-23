// @flow
import isOnline from 'is-online';
import { observable, when } from 'mobx';

import { notify } from 'components/ui/Notification';
import RootStore from 'stores/RootStore';

export default class ApplicationStore {
  @observable connected: boolean;
  @observable downtime: number;
  @observable uptime: number;

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
    const { timeStamp } = event;

    if (event.type === 'offline') {
      this.connected = false;
      this.downtime = timeStamp;
      notify(
        'info',
        'No internet',
        'An active internet connection is required for full functionality of the app',
      );
    }

    if (event.type === 'online') {
      this.connected = true;
      this.uptime = timeStamp;
      // FIXME: I suspect this does not work properly 100%. In any case,
      // this needs to be refactored, or if necessary, removed
      notify(
        'info',
        'Connected to the internet',
        `Downtime: ${(this.uptime - this.downtime).toFixed()}ms`,
      );
    }
  };
}
