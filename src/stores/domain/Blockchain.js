// @flow
import { observable } from 'mobx';

import RootStore from 'stores/RootStore';

export default class BlockchainStore {
  @observable description: string = '';
  @observable maxBlockSize: number = 64000;
  @observable miningDiversity: number = 0.5;
  @observable miningTurnover: number = 0.0;
  @observable name: string = '';
  @observable targetBlockTime: number = 1500;

  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }
}
