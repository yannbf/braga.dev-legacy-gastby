import React from 'react';
import styled from 'styled-components';

import Github from '../components/icons/Github';
import { Link } from '../components/Link';
import Twitter from '../components/icons/Twitter';
import { useTheme } from '../utils/context';
import { colors } from '../styles/common';
import constants from '../constants';

const SocialMedia = styled.ul`
  display: flex;
  align-items: center;
  margin: 0 -10px;
  padding: 0;
  justify-content: center;

  svg {
    width: 35px;
    display: flex;
  }
`;

const SocialMediaItem = styled.li`
  margin: 0 10px;

  &:before {
    content: '';
  }
`;

const SocialMediaGroup: React.FC = () => {
  const { theme } = useTheme();
  const iconFill = theme === 'light' ? colors.textTitleLight : colors.textTitleDark;
  const items = [
    {
      link: constants.social.github,
      icon: <Github iconFill={iconFill} />,
    },
    {
      link: constants.social.twitter,
      icon: <Twitter iconFill={iconFill} />,
    },
  ];

  return (
    <SocialMedia>
      {items.map((item) => (
        <SocialMediaItem key={item.link}>
          <Link to={item.link}>{item.icon}</Link>
        </SocialMediaItem>
      ))}
    </SocialMedia>
  );
};

export default SocialMediaGroup;
