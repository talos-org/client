// @flow
import { observable } from 'mobx';

import RootStore from 'stores/RootStore';

export default class BlockchainStore {
  @observable description: string = '';
  @observable maxBlockSize: number = 8388608;
  // Suggested value to be used during production. Otherwise,
  // the default is 0.3
  @observable miningDiversity: number = 0.6;
  @observable miningTurnover: number = 0.5;
  @observable name: string = '';
  @observable targetBlockTime: number = 15;

  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }
}
