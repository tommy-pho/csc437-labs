import { css } from "lit";

const resetStyles = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    display: block;
    max-width: 100%;
  }
`;

export default resetStyles;
