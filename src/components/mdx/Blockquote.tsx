import React from 'react';
import { Quote } from './Quote';

type Props = { theme: string; className?: string };

export const Blockquote: React.FC<Props> = (props) =>
  props.className && props.className === 'twitter-tweet' ? (
    <blockquote className={props.className}>{props.children}</blockquote>
  ) : (
    <Quote {...props} />
  );
