import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { colors, media, transitionDuration, textColor, textSize } from '../styles/common';
import { Link } from './Link';

const Post = styled.section`
  width: 100%;
  height: 340px;
  margin: 0 0 80px;

  ${media.large`
        height: calc(100% - 60px);
        margin: 0 0 60px;
        flex-basis: 400px;
        flex-grow: 1;
    `};

  @media screen and (min-width: 800px) {
    min-width: 570px;
  }
`;

const PostLink = styled(Link)`
  display: flex;
  text-decoration: none;
  height: 100%;
  background-color: ${(props) =>
    props.theme.color === 'light' ? colors.backgroundSecondaryLight : colors.backgroundSecondaryDark};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all ease-in-out ${transitionDuration.slow};

  ${media.large`
        flex-direction: column-reverse;
    `};

  &:hover {
    transform: scale(1.01) !important;
    box-shadow: 0 6px 10px 2px rgba(0, 0, 0, 0.1);
  }
`;

const PostDescription = styled.div`
  ${textColor.body};
  padding: 25px;
  width: 100%;
  height: 100%;

  ${media.large`
        padding-top: 15px;
        width: 100%;
    `};
`;

const PostTitle = styled.h3`
  ${textColor.title};
  font-weight: 400;
  line-height: 1.5;
  font-size: 2.8rem;
  margin-top: 0;
  margin-bottom: 5px;

  ${media.medium`
        font-size: 2.4rem;
    `};
`;

const MetaInfo = styled.div`
  ${textSize.small};
`;

const PostDate = styled.time``;

const MetaInfoSeparator = styled.span`
  display: inline-block;
  margin: 0 8px;
`;

const TimeToRead = styled.span``;

const Clock = styled.span`
  display: inline-block;
  margin-right: 5px;
`;

const PostExcerpt = styled.p`
  ${textSize.normal};
`;

type Props = {
  post: GatsbyTypes.BlogQuery['allMdx']['edges'][0]['node'];
};

const BlogCard: React.FC<Props> = ({ post }) => {
  const frontmatter = post.frontmatter;
  if (frontmatter === undefined) {
    return null;
  }
  const { slug, title, dateTimeString, formattedDate, description } = frontmatter;
  if (
    slug === undefined ||
    title === undefined ||
    dateTimeString === undefined ||
    formattedDate === undefined ||
    description === undefined
  ) {
    return null;
  }
  return (
    <Fade bottom key={post.id}>
      <Post>
        <PostLink to={slug}>
          <PostDescription>
            <PostTitle>{title}</PostTitle>
            <MetaInfo>
              <PostDate dateTime={dateTimeString}>{formattedDate}</PostDate>
              <MetaInfoSeparator>•</MetaInfoSeparator>
              <TimeToRead>
                <Clock>🕙</Clock>
                {post.timeToRead} min read
              </TimeToRead>
            </MetaInfo>
            <PostExcerpt>{description}</PostExcerpt>
          </PostDescription>
        </PostLink>
      </Post>
    </Fade>
  );
};

export default BlogCard;
