const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    if (node.fileAbsolutePath.includes("/workshops/")) {
      const relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "/",
      });

      createNodeField({
        name: `slug`,
        node,
        value: relativeFilePath,
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      slides: allMdx(
        filter: { fileAbsolutePath: { regex: "/(/workshops/)/" } }
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  result.data.slides.edges.forEach(({ node }) => {
    const slug =
      node.slug.charAt(node.slug.length - 1) == "/"
        ? node.slug.substr(0, node.slug.length - 1)
        : node.slug;
    createPage({
      path: `/${slug}`,
      component: path.resolve(`./src/templates/workshop.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    });
  });
};
