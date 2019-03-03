// @flow
// $FlowFixMe: Figure this out. Many `antd` components throw this error
import { notification } from 'antd';

type NotificationType = 'error' | 'info' | 'success' | 'warning';

export const notify = (
  type: NotificationType,
  message: string,
  description?: string,
  duration: number = 4.5,
) => {
  notification[type]({
    description,
    duration,
    message,
  });
};
