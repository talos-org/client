// @flow
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { render } from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import * as serviceWorker from './serviceWorker';

const AbsolutelyCentered = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
   {
    /* Nothing here, but this is here for props */
  }
`;

const GlobalStyle = createGlobalStyle`
  html {
    background: #000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const StyledButton = styled.button`
  background: #fff;
  border: 0;
  border-radius: 1.5px;
  color: #000;
  cursor: pointer;
  focus: 0;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  outline: none;
  text-align: center;
  text-transform: uppercase;
  width: 200px;
`;

@observer
class Now extends Component {
  @observable now;

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  start() {
    this.now = Date.now();
    console.log(`Started running @ ${this.now}`);
  }

  render() {
    return (
      <Container>
        <GlobalStyle />
        <AbsolutelyCentered>
          <StyledButton onClick={this.start}>Click to start</StyledButton>
        </AbsolutelyCentered>
      </Container>
    );
  }
}

const root = document.getElementById('root');

if (root != null) {
  render(<Now />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
