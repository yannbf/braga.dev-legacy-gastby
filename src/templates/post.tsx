import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

import { Divider, PaddedPageWrapper } from '../components/Common';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import { Title } from '../components/Typography';
import { colors, media, pageWidth, textSize, transitionDuration } from '../styles/common';
import { PageContext } from '../types/PageContext';
import ScrollProgress from '../utils/scrollProgress';
import { MDXContent, postContentPadding } from '../components/MdxContent';
import constants from '../constants';
// import gatsbyConfig from '../../gatsby-config';

const StyledPaddedPageWrapper = styled(PaddedPageWrapper)`
  ${pageWidth.small}
`;

const ProgressContainer = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 10px;
`;

const ProgressBar = styled.div`
  height: 10px;
  background: ${(props) => (props.theme.color === 'light' ? colors.textTitleLight : colors.textTitleDark)};
`;

const PostTitle = styled(Title)`
  text-align: left;
  margin: 0;
  margin-bottom: 5px;

  ${media.small`
        text-align: center;
    `};
`;

const Date = styled.time`
  display: block;
  margin-bottom: 40px;
  font-style: italic;

  ${media.small`
        text-align: center;
    `};
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const CategoriesLabel = styled.span`
  font-weight: 600;
  margin-bottom: 10px;
`;

const StyledCategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CategoryListItem = styled.li`
  padding: 0 10px;
  margin: 0;

  &:before {
    content: '';
  }
`;

const PostWrapperStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => (theme.color === 'light' ? colors.borderLight : colors.borderDark)};
  padding: 10px ${postContentPadding};
  transition: border-color ease-in-out ${transitionDuration.normal};

  &:hover {
    border-color: ${({ theme }) => (theme.color === 'light' ? colors.linkInactiveLight : colors.linkInactiveDark)};
  }
`;

const PostLabel = styled.span`
  font-weight: 600;
`;

const PostLinkTitle = styled.span``;

const PostLink = styled(Link)<{ type: 'next' | 'prev' }>`
  ${PostWrapperStyles};
  color: inherit;
  text-decoration: none;
  ${({ type }) =>
    type === 'next' &&
    css`
      margin-bottom: 20px;
      align-items: flex-end;
      text-align: right;
    `}

  &:hover {
    color: inherit;
  }
`;

const OtherPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;

  ${media.small`
        margin-bottom: 40px;
    `};
`;

const EditPostWrapper = styled.div`
  ${textSize.small};
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
`;

const CategoryList: React.FC<{ list: GatsbyTypes.MdxFrontmatter['categories'] }> = ({ list = [] }) => (
  <CategoriesWrapper>
    <CategoriesLabel>Categories:</CategoriesLabel>
    <StyledCategoryList>
      {list.map((category) => (
        <CategoryListItem key={category}>
          <Link to={`/categories/${category}`}>{category}</Link>
        </CategoryListItem>
      ))}
    </StyledCategoryList>
  </CategoriesWrapper>
);

interface PostProps {
  data: GatsbyTypes.PostQuery;
  pageContext: PageContext;
  location: Location;
}

const Post: React.FC<PostProps> = ({ data: { mdx }, pageContext: { next, prev }, location }) => {
  const frontmatter = mdx?.frontmatter;
  const body = mdx?.body;
  if (!frontmatter || !body) {
    return null;
  }
  const editLink = mdx?.fields?.editLink;

  const progressBar = useRef<HTMLDivElement>(null);
  const disqusConfig = {
    url: `${constants.site.url}/${location.pathname}`,
    identifier: mdx?.id,
    title: frontmatter.title,
  };

  useEffect(() => {
    const progressObserver = new ScrollProgress((x, y) => {
      if (progressBar.current !== null) {
        progressBar.current.style.width = `${y * 100}%`;
      }
    });

    return (): void => progressObserver.destroy();
  });

  const postUpdatedSinceFirstPublic =
    frontmatter.formattedUpdatedAtDate !== frontmatter.formattedPublicationDate &&
    frontmatter.formattedUpdatedAtDate !== null;

  return (
    <Layout frontmatter={frontmatter} isPost>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="article:author" content={constants.site.author} />
        <meta property="article:published_time" content={frontmatter.publicationDate} />
        <meta
          property="article:modified_time"
          content={postUpdatedSinceFirstPublic ? frontmatter.updatedAtDate : frontmatter.publicationDate}
        />
        {frontmatter.categories?.map(
          (category): JSX.Element => (
            <meta key={category} property="article:tag" content={category} />
          ),
        )}
        {mdx?.timeToRead && (
          <meta
            property="og:image"
            content={`https://og-image.braga.dev/${encodeURI(frontmatter.title)}.png?readTime=${mdx.timeToRead}`}
          />
        )}
      </Helmet>
      <ProgressContainer>
        <ProgressBar ref={progressBar} />
      </ProgressContainer>
      <StyledPaddedPageWrapper>
        <PostTitle>{frontmatter.title}</PostTitle>
        {postUpdatedSinceFirstPublic ? (
          <Date dateTime={frontmatter.updatedAtDate}>updated on {frontmatter.formattedUpdatedAtDate}</Date>
        ) : (
          <Date dateTime={frontmatter.publicationDate}>published on {frontmatter.formattedPublicationDate}</Date>
        )}
        <MDXContent>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXContent>
        <Divider />
        {editLink && (
          <EditPostWrapper>
            See a typo?&nbsp;
            <Link to={editLink}>Edit post on GitHub</Link>
          </EditPostWrapper>
        )}
        {frontmatter.categories && <CategoryList list={frontmatter.categories} />}
        {(next || prev) && (
          <OtherPostsWrapper>
            {prev && (
              <PostLink type="next" to={prev.fields.slug}>
                <PostLabel>Next:</PostLabel>
                <PostLinkTitle>{prev.fields.title}</PostLinkTitle>
              </PostLink>
            )}
            {next && (
              <PostLink type="prev" to={next.fields.slug}>
                <PostLabel>Previous:</PostLabel>
                <PostLinkTitle>{next.fields.title}</PostLinkTitle>
              </PostLink>
            )}
          </OtherPostsWrapper>
        )}
        <CommentCount config={disqusConfig} placeholder={'...'} />
        <Disqus config={disqusConfig} />
      </StyledPaddedPageWrapper>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query Post($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      id
      frontmatter {
        title
        description
        formattedPublicationDate: date(formatString: "MMMM DD, YYYY")
        publicationDate: date(formatString: "YYYY-MM-DD")
        formattedUpdatedAtDate: updatedAt(formatString: "MMMM DD, YYYY")
        updatedAtDate: updatedAt(formatString: "YYYY-MM-DD")
        slug
        categories
      }
      timeToRead
      fields {
        editLink
      }
      body
    }
  }
`;
