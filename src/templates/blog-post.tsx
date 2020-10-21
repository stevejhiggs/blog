import React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled from "styled-components";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

const StyledBlogPost = styled.article`
  header h1 {
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-4) var(--spacing-0);
  }

  header p {
    font-size: var(--fontSize-2);
    font-family: var(--font-heading);
  }

  ul,
  ol {
    margin-left: var(--spacing-8);
    list-style-type: disc;
  }
`;

const StyledNav = styled.nav`
  ul {
    margin: var(--spacing-0);
  }
`;

const BlogPostTemplate: React.FC<PageProps<any>> = ({
  data,
  pageContext,
  location,
}) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = pageContext as any;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <StyledBlogPost itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section itemProp="articleBody">
          <MDXRenderer>{post.body}</MDXRenderer>
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </StyledBlogPost>
      <StyledNav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </StyledNav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
