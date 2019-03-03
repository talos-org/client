// @flow
import { action, computed, observable } from 'mobx';

import ApplicationStore from 'stores/ApplicationStore';
import BlockchainStore from 'stores/domain/Blockchain';
import CurrentBlockchainStore from 'stores/domain/CurrentBlockchain';
import GlobalHeaderStore from 'stores/ui/GlobalHeader';
import GraphStore from 'stores/domain/Graph';

import { get, remove } from 'utils/chainName';

export default class RootStore {
  @observable
  // FIXME: Remove the use of a “root“ state
  rootState = {
    currentBlockchain: '',
    // FIXME: Move this to `ApplicationStore`
    disconnect: false,
    // TODO: Remove this (↓) as it’s no longer being used
    currentTab: 'monitoring',
    sidebarCollapsed: false,
    wizard: {
      currentStep: 0,
    },
  };

  applicationStore: ApplicationStore;
  blockchainStore: BlockchainStore;
  currentBlockchainStore: CurrentBlockchainStore;
  globalHeaderStore: GlobalHeaderStore;
  graphStore: GraphStore;

  constructor() {
    this.applicationStore = new ApplicationStore(this);
    this.blockchainStore = new BlockchainStore(this);
    this.currentBlockchainStore = new CurrentBlockchainStore(this);
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
