// @flow
import * as React from 'react';

type Props = { step: string };

export default class OnboardingContainer extends React.Component<Props> {
  render() {
    const { step } = this.props;
    return <pre>{JSON.stringify(step, null, 2)}</pre>;
  }
}
