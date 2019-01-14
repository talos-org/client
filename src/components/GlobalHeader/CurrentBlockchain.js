// @flow
import * as React from 'react';
import { inject } from 'mobx-react';

@inject('rootStore')
class CurrentBlockchain extends React.PureComponent<{}> {
  render() {
    return (
      <h1 style={{ textAlign: 'center' }}>
        {this.props.rootStore.rootState.currentBlockchain}
      </h1>
    );
  }
}

export default CurrentBlockchain;
