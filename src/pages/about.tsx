import Img from 'gatsby-image';
import React from 'react';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { PageWrapper, LightButton, DarkButton } from '../components/Common';
import { Title } from '../components/Typography';
import { Link } from '../components/Link';
import { colors, media, textSize } from '../styles/common';
import { ThemeEnum } from '../utils/context';

const AboutContainer = styled.div`
  padding: 120px 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;

  ${media.medium`
    flex-direction: column;
    padding: 80px 20px;
  `};
`;

const ProfileTitle = styled(Title)`
  color: inherit;
  margin-top: 40px;
  margin-bottom: 0;

  ${media.small`
        margin-top: 20px;
    `};
`;

const Subtitle = styled.span`
  ${textSize.normal};
  display: inline-block;
  margin-bottom: 25px;
`;

const Description = styled.p`
  ${textSize.normal};
  text-align: justify;
  width: 600px;
  max-width: 100%;
  margin: 20px auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 100%;
  border-radius: 20px;
  margin: 0 auto;
`;

export const About: React.FC = () => {
  const title = `I'm Yann Braga`;
  const subtitle = `Frontend Engineer based in Amsterdam, NL.`;

  return (
    <Layout title="Yann Braga | About">
      <PageWrapper>
        <AboutContainer>
          <ProfileImage src="../profile.jpg" />
          <section>
            <ProfileTitle as="h2">{title}</ProfileTitle>
            <Subtitle>{subtitle}</Subtitle>
            <Description>
              I&apos;m a software engineer from Brazil 🇧🇷 living in the land of the windmills 🇳🇱.
            </Description>
            <Description>
              I have been working with development since 2013. Started out as a .NET developer but my passion really
              sparked when I got into frontend. It became even bigger when I found out about open souce.{' '}
              <i>Do what you love and end up helping people? That&apos;s crazy awesome.</i>
            </Description>
            <Description>
              I love working with communities and sharing knowledge. Currently my focus has been on React and I have
              been making open source projects as well as contributing to projects like{' '}
              <Link to="https://github.com/storybookjs/storybook">Storybook.</Link>
            </Description>
          </section>
        </AboutContainer>
      </PageWrapper>
    </Layout>
  );
};

export default About;
