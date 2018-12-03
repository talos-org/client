// @flow
import * as React from 'react';
import FlexView from 'react-flexview';

export default class HeaderTitle extends React.Component<{}> {
  render() {
    return (
      <FlexView
        hAlignContent="center"
        vAlignContent="center"
        wrap
        style={{ backgroundColor: 'white' }}
      >
        <img
          alt="logo"
          height="50"
          src={require('../../images/dlogo-collapsed@2x.png')}
          width="50"
        />
        <h1 style={{ display: 'inline', fontSize: '3em', margin: 0 }}>Talos</h1>
      </FlexView>
    );
  }
}
