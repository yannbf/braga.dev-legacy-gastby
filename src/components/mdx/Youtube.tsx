import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles/common';

const StyledIframe = styled.iframe`
  width: 100%;
  margin: 40px 0;

  ${media.small`
        height: 350px;
    `};
`;

type YoutubeProps = {
  src: string;
};

export const Youtube: React.FC<YoutubeProps> = ({ src }) => {
  return (
    <StyledIframe
      width="560"
      height="420"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
