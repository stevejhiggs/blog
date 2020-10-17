import React from "react";
import Header from "./header";
import Footer from "./footer";

interface Props {
  location: any;
  title?: string;
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header isRootPath={isRootPath} title={title} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
