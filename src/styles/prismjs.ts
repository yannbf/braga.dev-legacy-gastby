import { css } from 'styled-components';

export const prismjsStyles = css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #383e49;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #9aa2b1;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }
  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #282c34;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #5c6370;
  }

  .token.punctuation {
    color: #abb2bf;
  }

  .token.selector,
  .token.tag {
    color: #e06c75;
  }

  .token.property,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.attr-name,
  .token.deleted {
    color: #d19a66;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.builtin,
  .token.inserted {
    color: #98c379;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #56b6c2;
  }

  .token.atrule,
  .token.keyword {
    color: #c678dd;
  }

  .token.function {
    color: #61afef;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #c678dd;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  pre.line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }

  pre.line-numbers > code {
    position: relative;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 0;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #5c6370;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
  /* Line highlighting makes the font way too big on mobile safari :( Don't know how to fix this bug */
  /* .gatsby-highlight-code-line {
        background-color: hsla(207, 95%, 15%, 1);
        display: block;
        margin-right: -1em;
        margin-left: -1em;
        padding-right: 1em;
        padding-left: 0.75em;
        border-left: 0.25em solid #80b2ed;
    }/*

    /* .gatsby-highlight pre[class*='language-'] {
        background-color: transparent;
        margin: 0;
        padding: 0;
        overflow: initial;
        float: left;
        min-width: 100%;
    } */
`;
