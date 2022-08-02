import React from "react";
import { Link } from "gatsby";

interface InternalExternalLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to?: string;
  fallBackElement?: string;
  state?: object;
}

const InternalExternalLink: React.FC<InternalExternalLinkProps> = ({
  to,
  children,
  fallBackElement: El = "span",
  state = {},
  ...props
}) => {
  if (!to) {
    return <El {...props}>{children}</El>;
  }
  if (to.startsWith("mailto:") || to.startsWith("http")) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} state={state} {...props}>
      {children}
    </Link>
  );
};

export { InternalExternalLink };
