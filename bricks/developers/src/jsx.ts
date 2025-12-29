import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { ProviderGroupListElementProps } from "./provider-group-list/index";
import type { ProviderGroupMenuElementProps } from "./provider-group-menu/index";
import type { BrickBookElementProps } from "./brick-book/index";
import type { BricksOfProvidersElementProps } from "./bricks-of-providers/index";
import type { BrickDebugElementProps } from "./brick-debug/index";
import type { BrickColorsElementProps } from "./brick-colors/index";
import type { DocBookElementProps } from "./doc-book/index";
import type { V3NextExampleElementProps } from "./v3-next-example/index";
import type { IllustrationCardElementProps } from "./illustration-card/index";
import type { ProviderDocElementProps } from "./provider-doc/index";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "developers--provider-group-list": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        ProviderGroupListElementProps & {
          onGroupClick?: (
            event: CustomEvent<{ namespace: string; group: any }>
          ) => void;
        };

      "developers--provider-group-menu": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        ProviderGroupMenuElementProps & {
          onMenuFold?: (event: CustomEvent<boolean>) => void;
        };

      "developers--brick-book": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BrickBookElementProps;

      "developers--bricks-of-providers": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BricksOfProvidersElementProps;

      "developers--brick-debug": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BrickDebugElementProps;

      "developers--brick-colors": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BrickColorsElementProps;

      "developers--doc-book": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        DocBookElementProps;

      "developers--v3-next-example": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        V3NextExampleElementProps & {
          onOnBlur?: (
            event: CustomEvent<{ code: string; mode: string }>
          ) => void;
        };

      "developers--illustration-card-list": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        IllustrationCardElementProps;

      "developers--provider-doc": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        ProviderDocElementProps & {
          onDebuggerExpandChange?: (event: CustomEvent<boolean>) => void;
        };
    }
  }
}
