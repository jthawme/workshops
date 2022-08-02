declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.jpg";
declare module "*.png";

interface SvgrComponent
  extends React.FunctionComponent<React.SVGAttributes<SVGElement>> {}

declare module "*.svg" {
  const ReactComponent: SvgrComponent;

  export { ReactComponent };
}
