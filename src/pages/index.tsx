import { graphql, PageProps } from "gatsby";

import * as React from "react";
import { Container } from "../components/Common/Container";
import { InternalExternalLink } from "../components/Common/InternalExternalLink";

interface WorkshopTemplateProps {
  content: {
    edges: Array<{
      node: {
        slug: string;
        frontmatter: {
          fullTitle: string;
        };
      };
    }>;
  };
}

// markup
const IndexPage: React.FC<PageProps<WorkshopTemplateProps>> = ({ data }) => {
  return (
    <Container>
      <ul>
        {data.content.edges.map(({ node }) => (
          <li key={node.slug}>
            <InternalExternalLink to={node.slug}>
              {node.frontmatter.fullTitle}
            </InternalExternalLink>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export const query = graphql`
  query MyQuery {
    content: allMdx {
      edges {
        node {
          slug
          frontmatter {
            fullTitle
          }
        }
      }
    }
  }
`;

export default IndexPage;
