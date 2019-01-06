// @flow
import { action } from 'mobx';
import RootStore from '../RootStore';

export default class GlobalHeaderStore {
  rootState: Object;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
  }

  @action
  toggleSideMenu = () => {
    // TODO: Remove this line
    console.log(`Toggle: ${this.rootState.sidebarCollapsed}`);
    this.rootState.sidebarCollapsed = !this.rootState.sidebarCollapsed;
  };
}
