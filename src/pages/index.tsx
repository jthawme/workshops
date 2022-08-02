import { graphql, PageProps } from "gatsby";

import * as React from "react";
import { Container } from "../components/Common/Container";
import { InternalExternalLink } from "../components/Common/InternalExternalLink";
import { Title } from "../components/Common/Title";

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
      <Title size="large">Workshops</Title>
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
