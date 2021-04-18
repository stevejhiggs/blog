/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

const StyledBio = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);

  p {
    margin-bottom: var(--spacing-0);
  }

  .bio-avatar {
    margin-right: var(--spacing-4);
    margin-bottom: var(--spacing-0);
    min-width: 50px;
    border-radius: 100%;
  }
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <StyledBio>
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <p>
        <strong>Steve</strong> writes software for a living and for fun.
        <br />
        <a href="https://github.com/shiggsatwork">github</a>
        <span> | </span>
        <a href="https://twitter.com/shiggsatwork">twitter</a>
      </p>
    </StyledBio>
  );
};

export default Bio;
