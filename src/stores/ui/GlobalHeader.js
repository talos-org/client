// @flow
import { action, observable } from 'mobx';
// import { observable } from 'mobx-react';

import { get, set } from 'utils/chainName';
import RootStore from 'stores/RootStore';

export default class GlobalHeaderStore {
  rootState: Object;
  rootStore: RootStore;
  @observable sidebarCollapsed: boolean;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootState = this.rootStore.rootState;
    this.sidebarCollapsed = !set('sidebarCollapsed', false);
  }

  @action
  toggleSideMenu = () => {
    console.log('[toggleSideMenu#sidebarCollapsed]', this.sidebarCollapsed);
    const success = set('sidebarCollapsed', this.sidebarCollapsed);
    console.log(
      '[toggleSideMenu#sidebarCollapsed after success]',
      this.sidebarCollapsed,
      success,
    );
    if (success) {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    console.log('[]', this.sidebarCollapsed);
  };
}
