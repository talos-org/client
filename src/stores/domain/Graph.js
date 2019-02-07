// @flow
import { action, computed, observable } from 'mobx';

import { getInactiveNodes, getPeerInfo } from 'api/monitoring';
import RootStore from 'stores/RootStore';
import { transformForGraph } from 'utils/graph';

export default class GraphStore {
  @observable data: Object = {};
  @observable inactiveNodes: Array<string> = [];
  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }

  @action.bound
  filterInactiveNodes = async (data: Object) => {
    this.inactiveNodes = await this.getAllInactiveNodes();

    this.inactiveNodes.forEach(walletAddress => {
      data.filter(el => el.handshake === walletAddress);
    });

    return transformForGraph(data);
  };

  getAllInactiveNodes = () => {
    return getInactiveNodes({ blockchainName: this.currentBlockchain }).then(
      ({ data }) => data,
    );
  };

  @action
  getCurrentGraphData = () => {
    return getPeerInfo(this.currentBlockchain)
      .then(({ data }) => this.filterInactiveNodes(data))
      .then(data => this.makeGraph(data));
  };

  @action.bound
  makeGraph = (data: Object) => {
    this.data = data;

    return data;
  };

  @action.bound
  transformForGraph = (graphData: Object) =>
    new Promise<Object>((resolve, reject) => {
      const data = {
        nodes: [],
        links: [],
        focusedNodeId: -1,
      };

      graphData.forEach(d => {
        data.nodes.push(d);
        data.nodes.forEach(node => {
          node.name = d.addr;
        });
        data.links.push({ source: -1, target: d.id });
      });

      data.nodes.push({ id: -1, color: '#033fff', name: 'Current' });

      resolve(data);
    });

  @computed
  get currentBlockchain() {
    return this.rootState.currentBlockchain;
  }
}
