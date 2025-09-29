import * as React from "react";

declare module "*.svg" {
  // React component export (SVGR)
  export const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  // Default export: URL string (for <img src="..." />)
  const src: string;
  export default src;
}
