import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';

import BlogList from '../components/BlogList';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import { PaddedPageWrapper } from '../components/Common';
import { Title } from '../components/Typography';
import { media } from '../styles/common';
import { BlogPageContext } from '../types/PageContext';
import constants from '../constants';

const StyledTitle = styled(Title)`
  margin-bottom: 100px;

  ${media.medium`
        margin-bottom: 60px;
    `};
`;

const Pagination = styled.ul`
  display: flex;
  padding: 0;
`;

const PaginationItem = styled.li<{ position: string }>`
  margin-left: ${(props): string | number => (props.position === 'right' ? 'auto' : 0)};

  &:before {
    display: none;
  }
`;

const PaginationLink = styled(Link)``;

type Props = {
  data: GatsbyTypes.BlogQuery;
  pageContext: BlogPageContext;
};

const Blog: React.FC<Props> = ({ data: { allMdx }, pageContext: { pagination } }) => {
  const { page, nextPagePath, previousPagePath } = pagination;

  const posts = page
    .map((id) => allMdx.edges.find((post) => post.node.id === id))
    .filter((post): post is GatsbyTypes.BlogQuery['allMdx']['edges'][0] => post !== undefined);

  return (
    <Layout title={`${constants.site.author} | Blog`}>
      <PaddedPageWrapper>
        <Fade top>
          <StyledTitle>Blog</StyledTitle>
        </Fade>
        {posts !== undefined && <BlogList posts={posts} />}
        <Pagination>
          {nextPagePath && (
            <PaginationItem position="left">
              <PaginationLink to={nextPagePath}>Newer Posts</PaginationLink>
            </PaginationItem>
          )}

          {previousPagePath && (
            <PaginationItem position="right">
              <PaginationLink to={previousPagePath}>Older Posts</PaginationLink>
            </PaginationItem>
          )}
        </Pagination>
      </PaddedPageWrapper>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query Blog {
    allMdx {
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
  }
`;
