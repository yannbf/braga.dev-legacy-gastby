import styled from 'styled-components';

import { colors, media } from '../styles/common';

export const postContentPadding = `20px`;

export const MDXContent = styled.div`
  hr {
    + h2,
    + h3,
    + h4,
    + h5 {
      margin-top: 0px;
    }
  }

  h2,
  h3,
  h4,
  h5 {
    + iframe {
      margin-top: 20px;
    }
  }

  img {
    max-width: 100%;
  }

  iframe {
    margin: 40px 0;
  }

  code:not([class*='language-']) {
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
    font-size: 1.6rem;
    border-radius: 0.3em;
    background: ${(props) => (props.theme.color === 'light' ? colors.inlineCodeLight : colors.inlineCodeDark)};
    padding: 0.15em 0.2em 0.05em;
    white-space: normal;

    ${media.small`
          font-size: 1.4rem;
        `}
  }

  .gatsby-highlight {
    margin-top: 40px;
    margin-bottom: 40px;

    ${media.small`
            margin-left: -${postContentPadding};
            margin-right: -${postContentPadding};
            border-left: 0;
            border-right: 0;
        `}
  }

  .gatsby-resp-image-wrapper {
    margin: 40px 0;
  }

  .token-line {
    line-height: 1.8;
  }

  img {
    display: block;
    margin: 40px 0;
  }

  .twitter-tweet {
    margin: auto;
  }
`;
