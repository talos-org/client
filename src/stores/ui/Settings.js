// @flow
import { action } from 'mobx';
import RootStore from 'stores/RootStore';

export default class SettingsStore {
  notifyNetworkLoss: boolean;
  polling: boolean;
  pollingTime: number;
  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;

    this.notifyNetworkLoss = true;
    this.polling = true;
    this.pollingTime = 10000;
  }

  @action
  toggleNetworkLossNotifications() {
    this.notifyNetworkLoss = !this.notifyNetworkLoss;
  }

  @action
  togglePolling() {
    this.polling = !this.polling;
  }
}
