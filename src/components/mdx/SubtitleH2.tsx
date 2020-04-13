import styled from 'styled-components';
import { textColor } from '../../styles/common';

export default styled.h2`
  ${textColor.title};
  text-align: left;
  font-size: 2.8rem;
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 400;
  line-height: 1;

  * {
    font-size: 2.8rem !important;
  }

  svg {
    height: 28px;
  }
`;
