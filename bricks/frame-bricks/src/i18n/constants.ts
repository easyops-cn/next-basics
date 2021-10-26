export const NS_FRAME_BRICKS = "frame-bricks";

export enum K {
  FRAME_BRICKS = "FRAME_BRICKS",
  UNPIN_NAVIGATION = "UNPIN_NAVIGATION",
  FIXED_NAVIGATION = "FIXED_NAVIGATION",
  CLICK_TO_FIX_NAVIGATION = "CLICK_TO_FIX_NAVIGATION",
}

export type Locale = { [key in K]: string };
