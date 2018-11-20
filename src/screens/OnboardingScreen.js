// @flow
import * as React from 'react';

import OnboardingContainer from '../containers/OnboardingContainer/index';

// $FlowFixMe route to proper onboarding-create vs onboarding-connect container based on match.params.type
export default ({ match }) => <OnboardingContainer step={match.params.id} />;
