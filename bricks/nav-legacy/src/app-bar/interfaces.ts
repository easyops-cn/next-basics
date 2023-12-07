import { DesktopItemDir } from "@next-core/brick-types";

export type NormalizedDesktopDir = Pick<DesktopItemDir, "name" | "items"> & {
  size?: string;
};
