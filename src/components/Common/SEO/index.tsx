import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

type MetaTags = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>;

interface SEOProps {
  lang?: string;
  title?: string;
  description?: string;
  meta?: MetaTags[];
  urlPath?: string;
  children?: React.ReactNode;
}

const prefixSite = (url: string, siteUrl: string): string => {
  return url.substring(0, 4) !== "http" ? `${siteUrl}${url}` : url;
};

const SEO: React.FC<SEOProps> = ({
  lang = "en",
  title,
  description,
  meta = [],
  urlPath = "/",
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const url = `${site.siteMetadata.siteUrl}${urlPath}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s — ${site.siteMetadata.title}`}
      defaultTitle="Workshops"
      meta={(
        [
          { rel: "icon", type: "image/png", href: "/icon.png" },
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title || "Workshops",
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: `og:url`,
            content: url,
          },
          // image
          //   ? {
          //       property: `og:image`,
          //       content: prefixSite(image, site.siteMetadata.siteUrl),
          //     }
          //   : {},
          // {
          //   name: `twitter:card`,
          //   content: `summary_large_image`,
          // },
          {
            name: `twitter:creator`,
            content: "@jthawme",
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            property: `twitter:url`,
            content: url,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          // image
          //   ? {
          //       property: `twitter:image`,
          //       content: prefixSite(image, site.siteMetadata.siteUrl),
          //     }
          //   : {},
        ] as MetaTags[]
      ).concat(meta)}
    >
      {children}
    </Helmet>
  );
};

export { SEO };
