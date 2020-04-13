import { Helmet } from 'react-helmet';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { withPrefix, StaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';

import Inter from '../../assets/fonts/Inter/Inter';
import { colors, textColor, textSize, media, transitionDuration } from '../styles/common';
import { prismjsStyles } from '../styles/prismjs';
import { components } from './mdx';
import Footer, { footerHeight } from './Footer';
import Menu, { menuHeight } from './Menu';

const GlobalStyles = createGlobalStyle`
    ${Inter};
    ${prismjsStyles}

    * {
        box-sizing: border-box;
    }

    html {
    font-size: 10px;
    }

    ::selection {
        background-color: ${(props) => (props.theme && props.theme.color === 'light' ? '#80b2ed' : '#595dde')};
        color: white;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 11px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background-color: ${(props) =>
          props.theme && props.theme.color === 'light' ? 'rgba(78, 86, 102, 0)' : 'rgba(78, 86, 102, 0.2)'};
        border: 1px solid rgba(0,0,0, 0.1);
        border-radius: 0;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(78, 86, 102, 0.4);
        border-radius: 0;
    }
        
    body {
        line-height: 1.8;
        ${textSize.normal};
        ${textColor.body};
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background-color: ${(props) =>
          props.theme && props.theme.color === 'light' ? colors.backgroundLight : colors.backgroundDark};
        transition: background-color ${transitionDuration.slow} ease-out;

    }

    pre {
        margin-top: 0;
    }

    ${() => {
      return null;
    }}

    strong {
        font-weight: 600;
    }

    ol,
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        line-height: 1.7;
        padding-left: 15px;

        li {
            margin-bottom: 8px;
        }
    }

    ul {
        list-style: none;

        li {
            position: relative;

            &::before {
                content: '-';
                position: absolute;
                left: -20px;
            }
        }
    }

    a {
        color: ${colors.linkInactiveLight};

        &:hover {
            color: ${colors.linkActiveLight};
        }
    }

    a.anchor {
        position: absolute;
        display: inline-flex;
        transform: translateX(calc(-100% - 6px));
        top: 0;

        ${media.medium`
            position: relative;
            margin-right: 4px;
            transform: none;
        `}
    }

    /**
    * This will hide the focus indicator if the element receives focus via the mouse,
    * but it will still show up on keyboard focus.
    */
    .js-focus-visible :focus:not(.focus-visible) {
        outline: none;
    }

    .caption {
        font-style: italic;
        text-align: center;
        display: block;
        margin-top: -25px;
        margin-bottom: 40px;

        + h2,
        + h3,
        + h4,
        + h5 {
            margin-top: 0;
        }
    }

`;

const Main = styled.main`
  min-height: calc(100vh - ${footerHeight}px - ${menuHeight}px);
`;

type Props = {
  frontmatter?: {
    title: string | null;
    description: string | null | undefined;
    banner?: {
      publicURL: string | null | undefined;
    };
    slug?: string;
    publicationDate?: string;
    updatedAtDate?: string;
  };
  title?: string | null;
  hideMenu?: boolean;
  hideFooter?: boolean;
  isPost?: boolean;
};

export const Layout: React.FC<Props> = ({
  frontmatter = { title: null, description: null, banner: { publicURL: null } },
  title: pageTitle = null,
  hideMenu = false,
  hideFooter = false,
  children,
  isPost = false,
}) => {
  return (
    <StaticQuery<GatsbyTypes.LayoutQuery>
      query={graphql`
        query Layout {
          site {
            siteMetadata {
              title
              description
              author
              siteUrl
            }
          }
        }
      `}
      render={(data) => {
        const site = data.site;
        const siteTitle = site?.siteMetadata?.title;
        const siteDescription = site?.siteMetadata?.description;
        const siteUrl = site?.siteMetadata?.siteUrl;
        const siteAuthor = site?.siteMetadata?.author;

        const {
          title: frontmatterTitle,
          description: frontmatterDescription,
          banner,
          slug,
          publicationDate,
          updatedAtDate,
        } = frontmatter;

        const publicURL = banner?.publicURL;

        const title = pageTitle || frontmatterTitle || siteTitle;
        const description = frontmatterDescription || siteDescription;

        let schemaArticle = null;
        if (isPost) {
          schemaArticle = {
            '@context': 'http://schema.org',
            '@type': 'Article',
            author: {
              '@type': 'Person',
              name: siteAuthor,
            },
            datePublished: publicationDate,
            dateModified: updatedAtDate ? updatedAtDate : publicationDate,
            description: frontmatterDescription,
            headline: frontmatterTitle,
            inLanguage: 'en-US',
            url: `${siteUrl}${slug}`,
            name: frontmatterTitle,
            ...(publicURL
              ? {
                  image: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}${publicURL}`,
                  },
                }
              : {}),
            mainEntityOfPage: `${siteUrl}${slug}`,
            publisher: {
              '@type': 'Organization',
              name: 'Yann Braga',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
              },
            },
          };
        }

        return (
          <>
            <GlobalStyles />
            <Helmet title={title}>
              <html lang="en" />
              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@yannbf" />

              <meta property="og:title" content={title} />
              {publicURL && (
                <meta property="og:image" content={`${siteUrl}${publicURL || withPrefix('/social-sharing.png')}`} />
              )}
              <meta property="og:description" content={description} />
              <meta property="og:type" content="website" />
            </Helmet>
            {!hideMenu && <Menu />}
            <MDXProvider components={components}>
              <Main>{children}</Main>
            </MDXProvider>
            {!hideFooter && <Footer />}
            {isPost && (
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
            )}
          </>
        );
      }}
    />
  );
};

export default Layout;
