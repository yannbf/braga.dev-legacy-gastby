import styled from 'styled-components';
import { textColor } from '../../styles/common';

export default styled.h4`
  ${textColor.title};
  text-align: left;
  font-size: 1.8rem;
  margin-top: 30px;
  margin-bottom: 20px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1;

  * {
    font-size: 1.8rem !important;
  }

  svg {
    height: 18px;
  }
`;
