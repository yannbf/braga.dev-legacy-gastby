import styled from 'styled-components';
import { textColor } from '../../styles/common';

export default styled.h3`
  ${textColor.title};
  text-align: left;
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: 20px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1;

  * {
    font-size: 2rem !important;
  }

  svg {
    height: 20px;
  }
`;
