// @flow
import styled, { css } from 'styled-components';

import Logo2x from '../../images/logo@2x.png';
import rem from '../../utils/rem';

const Logo = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin: ${rem(20)} auto;
  ${p =>
    p.compact
      ? css`
          background-image: url(${Logo2x});
          width: ${rem(100)};
          height: ${rem(30)};
        `
      : css`
          background-image: url(${Logo2x});
          width: ${rem(310)};
          height: ${rem(310)};
        `};
`;

export default Logo;
