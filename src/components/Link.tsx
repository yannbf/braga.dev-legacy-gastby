import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/common';

const LinkBase = styled.a<{ active: string; to?: string }>`
  color: ${(props) => {
    if (props.active === 'true') {
      if (props.theme.color === 'light') {
        return colors.linkActiveLight;
      } else {
        return colors.linkActiveDark;
      }
    } else {
      if (props.theme.color === 'light') {
        return colors.linkInactiveLight;
      } else {
        return colors.linkInactiveDark;
      }
    }
  }};

  &:hover {
    color: ${(props) => (props.theme.color === 'light' ? colors.linkActiveLight : colors.linkActiveDark)};
  }
`;

type Props = {
  children: React.ReactNode;
  to: string;
  active?: string;
};

export const Link: React.FC<Props> = ({ children, to, active = 'false', ...other }) => {
  const internal = /^\/(?!static\/)/.test(to);
  const isHash = /^#/.test(to);

  if (internal) {
    return (
      <LinkBase as={GatsbyLink} to={to} active={active} {...other}>
        {children}
      </LinkBase>
    );
  }

  return (
    <LinkBase
      href={to}
      active={active}
      target={!isHash ? '_blank' : undefined}
      rel={!isHash ? 'noopener' : undefined}
      {...other}
    >
      {children}
    </LinkBase>
  );
};
