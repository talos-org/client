// @flow
import { action } from 'mobx';
import RootStore from 'stores/RootStore';

export default class GlobalHeaderStore {
  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }

  @action
  toggleSideMenu = () => {
    this.rootState.sidebarCollapsed = !this.rootState.sidebarCollapsed;
  };
}
