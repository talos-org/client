// @flow
import { action, computed, observable } from 'mobx';

import GlobalHeaderStore from 'stores/ui/GlobalHeader';
import { get, remove } from 'utils/chainName';

export default class RootStore {
  @observable
  rootState = {
    currentBlockchain: null,
    disconnect: false,
    sidebarCollapsed: false,
  };
  globalHeaderStore: GlobalHeaderStore;

  constructor() {
    this.globalHeaderStore = new GlobalHeaderStore(this);
    this.rootState.currentBlockchain = get('chainName');
  }

  @action
  disconnect() {
    const success = remove('chainName');
    this.rootState.currentBlockchain = null;
    if (success && !this.rootState.currentBlockchain) {
      this.rootState.disconnect = true;
    }
  }

  @computed
  get redirectNeeded() {
    return (
      this.rootState.disconnect && !Boolean(this.rootState.currentBlockchain)
    );
  }
}
