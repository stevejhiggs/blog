/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
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
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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

  const avatar = data?.avatar?.childImageSharp?.fixed;

  return (
    <StyledBio>
      <Image
        fixed={avatar}
        alt={author?.name || ``}
        className="bio-avatar"
        imgStyle={{
          borderRadius: `50%`,
        }}
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
