// @flow
import * as React from 'react';
import MonitoringComponent from '../../components/monitoring/index';

type Props = {};

export default class MonitoringContainer extends React.Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <MonitoringComponent />;
  }
}
