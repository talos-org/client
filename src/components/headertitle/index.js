// @flow
import * as React from 'react';
import FlexView from 'react-flexview';

export default class HeaderTitle extends React.Component {
  render() {
    return (
      <FlexView
        hAlignContent="center"
        vAlignContent="center"
        style={{ backgroundColor: 'white' }}
      >
        <img width="50" height="50" src={require('./talos_tmp_logo.png')} />
        <h1 style={{ display: 'inline', fontSize: '3em', margin: 0 }}>Talos</h1>
      </FlexView>
    );
  }
}
