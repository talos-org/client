// @flow
import * as React from 'react';

type Props = {};

class DummyContainer extends React.Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div>Dummy</div>;
  }
}

export { DummyContainer };
