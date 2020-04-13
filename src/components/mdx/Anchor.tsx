import React from 'react';
import { Link } from '../Link';

type Props = { theme: string; href: string };

export const Anchor: React.FC<Props> = (props) => (
  <Link to={props.href} {...props}>
    {props.children}
  </Link>
);
