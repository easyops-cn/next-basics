import { getRuntime } from "@next-core/brick-kit";
import { encryptValue } from "../shared";

getRuntime().registerCustomProcessor("generalAuth.encryptValue", encryptValue);
