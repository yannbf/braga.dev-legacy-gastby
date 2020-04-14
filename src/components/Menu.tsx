import React from 'react';
import { Location, WindowLocation } from '@reach/router';
import styled from 'styled-components';

import { colors, media, textColor, textSize, transitionDuration } from '../styles/common';
import { useTheme } from '../utils/context';
import { Link } from './Link';
import { ConstrainedPageWidth } from './Common';
import ThemeSwitch from './ThemeSwitch';
import constants from '../constants';

export const menuHeight = 60;

const Menu = styled.div`
  position: relative;
  z-index: 1;
  height: ${menuHeight}px;
  padding: 0 20px;
  background-color: ${(props) =>
    props.theme.color === 'light' ? colors.backgroundSecondaryLight : colors.backgroundSecondaryDark};

  border-bottom: 2px solid ${colors.borderLight};
  border-color: ${(props) => (props.theme.color === 'light' ? colors.borderLight : colors.borderDark)};
  transition: background-color ${transitionDuration.slow} ease-out;
  ${media.small`
        height: 180px;
    `};
`;

const ModifiedPageWrapper = styled.div`
  ${ConstrainedPageWidth};
  display: flex;
  align-items: center;
  height: 100%;

  ${media.small`
        flex-direction: column;
        justify-content: center;
    `};
`;

const MenuTitle = styled.span`
  ${textColor.title};
  ${textSize.normal};
  text-transform: uppercase;
  margin: 0 auto 0 0;

  ${media.small`
        margin: 0 0 20px 0;
    `};
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  ${media.small`
        margin-right: 0;
    `};
`;

const NavListItem = styled.li`
  ${textSize.normal};
  padding: 0 35px;
  margin: 0;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  &::before {
    content: '';
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const ModifiedThemeSwitch = styled(ThemeSwitch)`
  margin-left: 50px;
  display: flex;
  align-items: center;

  ${media.small`
        margin-left: 0;
        margin-top: 20px;
    `};
`;

// tslint:disable-next-line prettier
const NAVIGATION = [
  { to: '/blog/', label: 'blog' },
  { to: '/projects/', label: 'projects' },
  { to: '/about/', label: 'about' },
];

const MenuTitleComponent = ({ location, children }: { location: WindowLocation; children: React.ReactNode }) => {
  if (location.pathname === '/') {
    return <MenuTitle as="h1">{children}</MenuTitle>;
  } else {
    return <MenuTitle>{children}</MenuTitle>;
  }
};

const MenuComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Menu>
      <Location>
        {({ location }) => (
          <ModifiedPageWrapper>
            <MenuTitleComponent location={location}>
              <NavLink to="/">{constants.site.author}</NavLink>
            </MenuTitleComponent>
            <Nav>
              <NavList>
                {NAVIGATION.map((navigation) => (
                  <NavListItem key={navigation.label}>
                    <NavLink to={navigation.to} active={(navigation.to === location.pathname).toString()}>
                      {navigation.label}
                    </NavLink>
                  </NavListItem>
                ))}
              </NavList>
            </Nav>
            <ModifiedThemeSwitch theme={theme} onChange={toggleTheme} />
          </ModifiedPageWrapper>
        )}
      </Location>
    </Menu>
  );
};

export default MenuComponent;
