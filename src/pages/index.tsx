import Img from 'gatsby-image';
import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';

import BlogList from '../components/BlogList';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import { Button, Divider, PageWrapper } from '../components/Common';
import { Title } from '../components/Typography';
import { media, textSize, textColor, transitionDuration } from '../styles/common';
import SocialMediaGroup from '../components/SocialMediaGroup';
import constants from '../constants';

const Header = styled.div`
  position: relative;
  height: 560px;
  display: flex;
  padding: 0 20px;
  background-color: ${(props) => (props.theme.color === 'light' ? '#000000' : '#91d8ff')};
  background-image: ${(props) =>
    props.theme.color === 'dark'
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23180d1c' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23261431' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23351947' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23451e5e' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23552277' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%2391d8ff' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23aae0ff' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23c1e8ff' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23d7efff' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23ebf7ff' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23ffffff' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`};
  background-size: cover;
  background-repeat: no-repeat;
  ${media.medium`
        height: unset;
        padding-top: 120px;
        padding-bottom: 120px;
    `};
`;

const StyledPageWrapper = styled(PageWrapper)`
  padding: 40px 0;
`;

const HeaderWrapper = styled(PageWrapper)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IntroTitle = styled.h1`
  ${textSize.xlarge};
  ${textColor.title};
  margin: 0;
  margin-bottom: 10px;
`;

const IntroDescription = styled.p`
  ${textSize.large};
  ${textColor.body};
  margin-top: 0;
  margin-bottom: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const RecentPosts = styled(Section)`
  align-items: center;
`;

const Projects = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const ProjectWrapper = styled.div`
  flex-basis: 360px;
  max-width: 100%;
`;

const LinkedProject = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: all ease-in-out ${transitionDuration.slow};
  display: block;

  &:hover {
    transform: scale(1.02);
    color: inherit;
  }
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 60px;
`;

const ProjectTitle = styled.h3`
  ${textColor.title};
  ${textSize.large};
  font-family: 'Inter';
  margin: 0 0 10px 0;
`;

const ProjectImage = styled(Img)`
  margin-bottom: 20px;
  width: 240px;
  max-width: 100%;
`;

const ProjectDescription = styled.p`
  ${textSize.normal};
  text-align: center;
  margin: 0;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 100px;

  ${media.medium`
        margin-bottom: 60px;
    `};
`;

type Props = {
  data: GatsbyTypes.HomeQuery;
};

const WrappedProject: React.FC<{
  projectPageLink: string | undefined;
}> = ({ projectPageLink, children }) => {
  if (projectPageLink) {
    return <LinkedProject to={`${projectPageLink}`}>{children}</LinkedProject>;
  } else {
    return <>children</>;
  }
};

export const Home: React.FC<Props> = ({
  data: {
    posts: { edges: posts },
    projects: { edges: projects },
  },
}) => {
  return (
    <Layout>
      <Header>
        <HeaderWrapper>
          <IntroTitle>{constants.site.author}</IntroTitle>
          <IntroDescription>Frontend Engineer</IntroDescription>
          <SocialMediaGroup />
        </HeaderWrapper>
      </Header>
      <StyledPageWrapper>
        <RecentPosts>
          <Fade top>
            <StyledTitle as="h2">Recent Posts</StyledTitle>
          </Fade>
          <BlogList posts={posts} />
          <Fade bottom>
            <Button to="/blog">See all posts</Button>
          </Fade>
        </RecentPosts>
        <Fade>
          <Divider />
        </Fade>
        <Section>
          <Fade top>
            <StyledTitle as="h2">Recent Projects</StyledTitle>
          </Fade>
          <Projects>
            {projects.map(({ node: project }) => {
              const frontmatter = project.frontmatter;
              if (frontmatter === undefined) {
                return null;
              }
              const { slug, image, title, description } = frontmatter;
              if (slug === undefined || image === undefined || title === undefined || description === undefined) {
                return null;
              }
              return (
                <ProjectWrapper key={project.fields?.id}>
                  <WrappedProject projectPageLink={`/projects${slug}`}>
                    <Fade top>
                      <Project>
                        <ProjectImage fluid={image.childImageSharp?.fluid} />
                        <ProjectTitle>{title}</ProjectTitle>
                        <ProjectDescription>{description}</ProjectDescription>
                      </Project>
                    </Fade>
                  </WrappedProject>
                </ProjectWrapper>
              );
            })}
          </Projects>
          <Fade bottom>
            <Button to="/projects">See all projects</Button>
          </Fade>
        </Section>
      </StyledPageWrapper>
    </Layout>
  );
};

export default Home;

export const pageQuery = graphql`
  query Home {
    posts: allMdx(
      limit: 6
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            formattedDate: date(formatString: "MMMM DD, YYYY")
            dateTimeString: date(formatString: "YYYY-MM-DD")
            slug
            categories
          }
          timeToRead
        }
      }
    }
    projects: allMdx(
      limit: 3
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
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
            slug
            image {
              childImageSharp {
                fluid(maxWidth: 240) {
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
