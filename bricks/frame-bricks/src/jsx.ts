import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { DropMenuElement, DropMenuElementProps } from "./drop-menu";
import type { NavMenuElement, NavMenuElementProps } from "./nav-menu";
import type { SideBarElement, SideBarElementProps } from "./side-bar";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "frame-bricks--drop-menu": DetailedHTMLProps<
        HTMLAttributes<DropMenuElement>,
        DropMenuElement
      > & Partial<DropMenuElementProps>;
      "frame-bricks--nav-menu": DetailedHTMLProps<
        HTMLAttributes<NavMenuElement>,
        NavMenuElement
      > & Partial<NavMenuElementProps>;
      "frame-bricks--side-bar": DetailedHTMLProps<
        HTMLAttributes<SideBarElement>,
        SideBarElement
      > & Partial<SideBarElementProps> & {
        onSideBarFixed?: (event: CustomEvent<boolean>) => void;
        onSideBarResize?: (event: CustomEvent<string>) => void;
      };
    }
  }
}
