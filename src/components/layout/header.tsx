/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

interface Props {
  isRootPath: boolean;
  title: string;
}

const Header: React.FC<Props> = ({ isRootPath, title }) => {
  let header: JSX.Element;
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
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

  return <header className="global-header">{header}</header>;
};

export default Header;
