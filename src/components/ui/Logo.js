// @flow
import styled, { css } from 'styled-components';

import Logo2x from 'images/talogo@2x.png';
import rem from 'utils/rem';

const Logo = styled.div`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  ${p =>
    p.compact
      ? css`
          background-image: url(${Logo2x});
          width: ${rem(100)};
          height: ${rem(30)};
        `
      : css`
          background-image: url(${Logo2x});
          width: ${rem(150)};
          height: ${rem(150)};
        `};
`;

export default Logo;
