// @flow
import { action, computed, observable } from 'mobx';

import RootStore from 'stores/RootStore';
import { transformForGraph } from 'utils/graph';

export default class GraphStore {
  // This holds the transformed graph data
  @observable graphData: Array<Object>;
  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }

  @action
  getCurrentGraphData = async (): Promise<Array<Object>> => {
    const connectedNodes = await this.rootStore.nodeStore.fetchConnectedNodes();
    this.graphData = await transformForGraph(connectedNodes);

    return this.graphData;
  };

  @computed
  get currentBlockchain() {
    return this.rootState.currentBlockchain;
  }
}
