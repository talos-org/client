// @flow
import { action, computed, observable } from 'mobx';

import BlockchainStore from 'stores/domain/Blockchain';
import GlobalHeaderStore from 'stores/ui/GlobalHeader';
import GraphStore from 'stores/domain/Graph';

import { get, remove } from 'utils/chainName';

export default class RootStore {
  @observable
  rootState = {
    currentBlockchain: '',
    disconnect: false,
    // FIXME: This, along with some other of these need
    // to be moved into the global UI store
    currentTab: 'monitoring',
    sidebarCollapsed: false,
    wizard: {
      currentStep: 0,
    },
  };
  blockchainStore: BlockchainStore;
  globalHeaderStore: GlobalHeaderStore;
  graphStore: GraphStore;

  constructor() {
    this.blockchainStore = new BlockchainStore(this);
    this.globalHeaderStore = new GlobalHeaderStore(this);
    this.graphStore = new GraphStore(this);
    this.rootState.currentBlockchain = get('chainName');
  }

  @action
  disconnect() {
    const success = remove('chainName');
    this.rootState.currentBlockchain = '';
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
