import React from "react";
import styled from "styled-components";
import Header from "./header";
import Footer from "./footer";

interface Props {
  location: any;
  title?: string;
}

const StyledWrapper = styled.div`
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
  padding: var(--spacing-10) var(--spacing-5);
`;

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <StyledWrapper data-is-root-path={isRootPath}>
      <Header isRootPath={isRootPath} title={title} />
      <main>{children}</main>
      <Footer />
    </StyledWrapper>
  );
};

export default Layout;
