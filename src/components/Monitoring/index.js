// @flow
import * as React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const sample_data = [
  { stream: 'Cat Scan', size: 2400 },
  { stream: "Driver's License", size: 655 },
  { stream: 'Health Card', size: 980 },
  { stream: 'X-Ray', size: 5320 },
  { stream: 'Other', size: 3642 },
];

const cols = {
  size: {
    tickInterval: 1000,
    alias: 'Size (KB)',
  },
  stream: {
    alias: 'Stream Name',
  },
};

export default class MonitoringComponent extends React.Component<{}> {
  render() {
    return (
      <div>
        <h1>Blockchain Storage Usage per Data Stream</h1>
        <Chart width={800} height={600} data={sample_data} scale={cols}>
          <Axis name="stream" title />
          <Axis name="size" title />
          <Tooltip />
          <Geom type="interval" position="stream*size" />
        </Chart>
      </div>
    );
  }
}
