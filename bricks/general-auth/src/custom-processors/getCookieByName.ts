import { getRuntime } from "@next-core/brick-kit";
import { getCookieByName } from "../shared";

getRuntime().registerCustomProcessor(
  "generalAuth.getCookieByName",
  getCookieByName
);
