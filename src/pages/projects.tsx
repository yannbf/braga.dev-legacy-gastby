import Img from 'gatsby-image';
import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { PageWrapper, LightButton, DarkButton } from '../components/Common';
import { Title } from '../components/Typography';
import { colors, media, textSize } from '../styles/common';
import { ThemeEnum } from '../utils/context';

const Project = styled.div<{
  textColor: ThemeEnum;
}>`
  padding: 120px 20px;
  text-align: center;
  color: ${(props) => (props.textColor === 'light' ? colors.textBodyDark : colors.textBodyLight)};

  ${media.small`
        padding: 80px 20px;
    `};
`;

const ProjectTitle = styled(Title)`
  color: inherit;
  margin-top: 40px;
  margin-bottom: 0;

  ${media.small`
        margin-top: 20px;
    `};
`;

const ProjectSubtitle = styled.span`
  ${textSize.small};
  display: inline-block;
  margin-bottom: 25px;
`;

const ProjectDescription = styled.p`
  ${textSize.normal};
  width: 600px;
  max-width: 100%;
  margin: auto;
`;

const ProjectImage = styled(Img)`
  max-height: 420px;
  margin: auto;
  max-width: 100%;

  ${media.small`
        width: 300px;
    `};
`;

const LightProjectButton = styled(LightButton)`
  margin-top: 40px;
`;

const DarkProjectButton = styled(DarkButton)`
  margin-top: 40px;
`;

export const renderProjectButton = ({
  to,
  theme,
  text = 'Read more',
}: {
  to: string;
  theme: ThemeEnum;
  text?: string;
}): JSX.Element => {
  let Button;
  if (theme === ThemeEnum.dark) {
    Button = DarkProjectButton;
  } else {
    Button = LightProjectButton;
  }
  return <Button to={to}>{text}</Button>;
};

type Props = {} & { data: GatsbyTypes.ProjectsQuery };

export const Projects: React.FC<Props> = ({
  data: {
    allMdx: { edges: projects },
  },
}) => {
  return (
    <Layout title="Yann Braga | Projects">
      {projects.map(({ node: project }, index) => {
        const textColor = project.frontmatter?.textColor;
        if (textColor === undefined) {
          return null;
        }
        return (
          <Project
            key={project.fields?.id}
            style={{ backgroundColor: project.frontmatter?.backgroundColor }}
            textColor={textColor as ThemeEnum}
          >
            <Fade {...(index % 2 === 0 ? { left: true } : { right: true })}>
              <PageWrapper>
                <ProjectImage
                  fluid={project.frontmatter?.image?.childImageSharp?.fluid}
                  imgStyle={{ objectFit: 'contain' }}
                />
                <ProjectTitle as="h2">{project.frontmatter?.title}</ProjectTitle>
                <ProjectSubtitle>{project.frontmatter?.subtitle}</ProjectSubtitle>
                <ProjectDescription>{project.frontmatter?.description}</ProjectDescription>
                {project.frontmatter?.slug &&
                  renderProjectButton({
                    to: `/projects${project.frontmatter?.slug}`,
                    theme: textColor as ThemeEnum,
                  })}
              </PageWrapper>
            </Fade>
          </Project>
        );
      })}
    </Layout>
  );
};

export default Projects;

export const pageQuery = graphql`
  query Projects {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          fields {
            id
            slug
          }
          frontmatter {
            title
            subtitle
            description
            backgroundColor
            textColor
            slug
            image {
              childImageSharp {
                fluid(maxHeight: 840, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
