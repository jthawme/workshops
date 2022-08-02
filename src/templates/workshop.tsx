import React, { useMemo } from "react";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import * as styles from "../styles/pages/Workshop.module.scss";
import { Title } from "../components/Common/Title";
import { InternalExternalLink } from "../components/Common/InternalExternalLink";
import { Container } from "../components/Common/Container";
import { Markdown } from "../components/Common/Markdown";

interface WorkshopTemplateProps {
  content: {
    frontmatter: {
      title: string;
      fullTitle: string;
      description: string;
      links: Array<{
        to?: string;
        file?: {
          publicURL: string;
        };
        text: string;
      }>;
    };
    body: string;
  };
}

const WorkshopTemplate: React.FC<PageProps<WorkshopTemplateProps>> = ({
  data,
}) => {
  return (
    <Container>
      <Title size="large" tagName="h1">
        {data.content.frontmatter.fullTitle}
      </Title>

      <section id="description" className={styles.description}>
        <Markdown>{data.content.frontmatter.description}</Markdown>
      </section>

      <section id="links">
        <Title lined tagName="h2">
          Links
        </Title>

        <ul>
          {data.content.frontmatter.links.map((item, idx) => (
            <li key={idx}>
              <InternalExternalLink to={item.to || item.file?.publicURL}>
                {item.text}
              </InternalExternalLink>
            </li>
          ))}
        </ul>
      </section>

      <section id="body" className={styles.body}>
        <MDXRenderer>{data.content.body}</MDXRenderer>
      </section>
    </Container>
  );
};

export const query = graphql`
  query WorkshopQuery($slug: String!) {
    content: mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        fullTitle
        description
        links {
          to
          text
          file {
            publicURL
          }
        }
      }
      body
    }
  }
`;

export default WorkshopTemplate;
