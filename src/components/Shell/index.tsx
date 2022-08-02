import { graphql, PageProps, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";

import "../../styles/globals.scss";
import { registerBootlegVH } from "../../utils/events";
import { SEO } from "../Common/SEO";

const Shell: React.FC<PageProps> = ({ children }) => {
  useEffect(() => {
    registerBootlegVH();
  }, []);

  return (
    <>
      <SEO />
      {children}
    </>
  );
};

export { Shell };
