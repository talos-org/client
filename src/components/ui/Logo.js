// @flow
import styled, { css } from 'styled-components';

import Logo2x from 'images/logo-with-text@2x.svg';
import LogoInverted2x from 'images/logo--isometric@2x.svg';
import rem from 'utils/rem';

export const Logo = styled.div`
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
          width: ${rem(75)};
          height: ${rem(85)};
        `};
`;

export const LogoInverted = styled.div`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  ${p =>
    p.compact
      ? css`
          background-image: url(${LogoInverted2x});
          width: ${rem(100)};
          height: ${rem(30)};
        `
      : css`
          background-image: url(${LogoInverted2x});
          width: ${rem(150)};
          height: ${rem(150)};
        `};
`;
