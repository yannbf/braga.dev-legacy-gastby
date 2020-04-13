import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/common';
import BlogCard from './BlogCard';

const StyledBlogList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -10px;
  > * {
    width: calc(50% - 2 * 10px);
    margin: 0 10px;
  }

  ${media.large`
        flex-direction: column;
        justify-content: center;
        margin: unset;
        > * {
            margin: unset;
            width: 100%;
        }
    `};
`;

type Props = {
  posts: GatsbyTypes.BlogQuery['allMdx']['edges'];
};

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <StyledBlogList>
      {posts.map((post) => {
        if (post !== undefined) {
          return <BlogCard key={post.node.id} post={post.node} />;
        }
      })}
    </StyledBlogList>
  );
};

export default BlogList;
