import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { media, textSize, colors, pageWidth } from '../styles/common';
import { PageWrapper, PaddedPageWrapper } from '../components/Common';
import { MDXContent } from '../components/MdxContent';
import { renderProjectButton } from '../pages/projects';
import { ThemeEnum } from '../utils/context';

const Header = styled.div<{ backgroundColor: string }>`
  padding: 120px 20px;
  background-color: ${({ backgroundColor }): string => backgroundColor};
`;

const StyledPageWrapper = styled(PageWrapper)`
  display: flex;

  ${media.medium`
        flex-direction: column-reverse;
        align-items: center;
    `};
`;

const Title = styled.h1<{ textColor: string }>`
  ${textSize.xlarge};
  margin-bottom: 5px;
  color: ${({ textColor }): string => (textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};
`;

const Subtitle = styled.span<{ textColor: string }>`
  font-weight: 300;
  color: ${({ textColor }): string => (textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};
`;

const Description = styled.p<{ textColor: string }>`
  ${textSize.large};
  color: ${({ textColor }): string => (textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};
`;

const Links = styled.div`
  display: flex;

  ${media.medium`
        justify-content: center
    `};
`;

const LeftSection = styled.div`
  padding-top: 40px;
  padding-right: 40px;
  max-width: 640px;
  margin-right: auto;

  ${media.medium`
        margin-right: 0;
        padding-right: 0;
        text-align: center;
    `};
`;

const Image = styled(Img)`
  width: 500px;
  max-width: 100%;

  ${media.medium`
        width: 400px;
    `};
`;

const StyledPaddedPageWrapper = styled(PaddedPageWrapper)`
  ${pageWidth.small}
`;

type Props = { data: GatsbyTypes.ProjectQuery };

const project: React.FC<Props> = ({ data }) => {
  const frontmatter = data.mdx?.frontmatter;
  const backgroundColor = frontmatter?.backgroundColor;
  const textColor = frontmatter?.textColor;
  const body = data.mdx?.body;
  const githubLink = frontmatter?.github;
  const websiteLink = frontmatter?.website;
  if (!frontmatter || !body || !backgroundColor || !textColor) {
    return null;
  }
  return (
    <Layout
      title={frontmatter.title}
      frontmatter={{
        description: frontmatter.description,
        title: frontmatter.title,
        banner: frontmatter.banner,
        slug: frontmatter.slug,
      }}
    >
      <Header backgroundColor={backgroundColor}>
        <StyledPageWrapper>
          <LeftSection>
            <Title textColor={textColor}>{frontmatter.title}</Title>
            <Subtitle textColor={textColor}>{frontmatter.subtitle}</Subtitle>
            <Description textColor={textColor}>{frontmatter.description}</Description>
            <Links>
              {githubLink && renderProjectButton({ to: githubLink, theme: textColor as ThemeEnum, text: 'GitHub' })}
              {websiteLink &&
                renderProjectButton({
                  to: websiteLink,
                  theme: textColor as ThemeEnum,
                  text: 'Website',
                })}
            </Links>
          </LeftSection>
          <Image fluid={frontmatter.image?.childImageSharp?.fluid} imgStyle={{ objectFit: 'contain' }} />
        </StyledPageWrapper>
      </Header>
      <StyledPaddedPageWrapper>
        <MDXContent>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXContent>
      </StyledPaddedPageWrapper>
    </Layout>
  );
};

export default project;

export const pageQuery = graphql`
  query Project($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      id
      frontmatter {
        title
        description
        subtitle
        backgroundColor
        textColor
        slug
        github
        website
        image {
          childImageSharp {
            fluid(maxWidth: 500, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        banner {
          publicURL
        }
      }
      body
    }
  }
`;
