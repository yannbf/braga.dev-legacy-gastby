import React from 'react';
import styled from 'styled-components';

const StyledIframe = styled.iframe`
  width: 100%;
  margin: 40px 0;
  height: 500px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
`;

type SandboxProps = {
  src: string;
  title: string;
};

export const Sandbox: React.FC<SandboxProps> = ({ src, title }) => {
  return (
    <StyledIframe
      src={src}
      title={title}
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  );
};
