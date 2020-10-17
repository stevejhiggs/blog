import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

interface Props {
  isRootPath: boolean;
  title: string;
}

const StyledHeader = styled.header`
  margin-bottom: var(--spacing-10);

  h1 {
    font-size: var(--fontSize-7);
    margin: 0;
  }

  .header-link-home {
    font-weight: var(--fontWeight-bold);
    font-family: var(--font-heading);
    text-decoration: none;
    font-size: var(--fontSize-2);
  }
`;

const Header: React.FC<Props> = ({ isRootPath, title }) => {
  let header: JSX.Element;
  if (isRootPath) {
    header = (
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return <StyledHeader>{header}</StyledHeader>;
};

export default Header;
