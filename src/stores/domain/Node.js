// @flow
import { action, computed } from 'mobx';

import { getPeerInfo } from 'api/monitoring';
import RootStore from 'stores/RootStore';

export default class NodeStore {
  connectedNodes: Array<Object>;
  prevConnectedNodes: Array<Object>;
  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
    this.connectedNodes = [];
    this.prevConnectedNodes = [];
  }

  @action
  fetchConnectedNodes = async (): Promise<Array<Object>> => {
    const { data }: { data: Array<Object> } = await getPeerInfo(
      this.currentBlockchain,
    );

    if (!this.prevConnectedNodes) {
      this.connectedNodes = data;
    } else {
      this.prevConnectedNodes = this.connectedNodes;
      this.connectedNodes = data;
    }

    return this.connectedNodes;
  };

  @computed
  get currentBlockchain(): string {
    return this.rootState.currentBlockchain;
  }
}
