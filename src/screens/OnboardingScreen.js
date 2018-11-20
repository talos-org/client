// @flow
import * as React from 'react';

import OnboardingContainer from '../containers/OnboardingContainer/index';

// $FlowFixMe
export default ({ match }) => <OnboardingContainer type={match.params.type} />;
