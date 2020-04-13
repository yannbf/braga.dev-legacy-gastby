import { Link } from '../Link';
import { Divider } from '../Common';
import { Anchor } from './Anchor';
import { Blockquote } from './Blockquote';
import Paragraph from './Paragraph';
import SubtitleH2 from './SubtitleH2';
import SubtitleH3 from './SubtitleH3';
import SubtitleH4 from './SubtitleH4';
import { Quote } from './Quote';
import { Title } from './Title';
import { Video } from './Video';
import { Youtube } from './Youtube';
import { Sandbox } from './Sandbox';
import { TwoImages } from './TwoImages';

export const components = {
  a: Anchor,
  h1: Title,
  h2: SubtitleH2,
  h3: SubtitleH3,
  h4: SubtitleH4,
  p: Paragraph,
  hr: Divider,
  blockquote: Blockquote,
  Video: Video,
  Youtube: Youtube,
  Sandbox: Sandbox,
  Link: Link,
  Quote: Quote,
  TwoImages: TwoImages,
};
