// @flow
import { action, observable } from 'mobx';

import RootStore from 'stores/RootStore';

export default class CurrentBlockchainStore {
  currentBlockchain = observable.map<string, any>([
    ['description', ''],
    ['maxBlockSize', 8388608],
    ['miningDiversity', 0.6],
    ['miningTurnover', 0.5],
    ['name', ''],
    ['targetBlockTime', 15],
  ]);

  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }

  get = (k: string) => {
    return this.currentBlockchain.get(k);
  };

  @action
  set = (k: string, v: any) => {
    this.currentBlockchain.set(k, v);
  };
}
