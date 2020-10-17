import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: var(--spacing-6) var(--spacing-0);
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </StyledFooter>
  );
};

export default Footer;
