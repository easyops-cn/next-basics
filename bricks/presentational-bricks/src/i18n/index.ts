import i18next from "i18next";
import { NS_PRESENTATIONAL_BRICKS } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_PRESENTATIONAL_BRICKS, en);
i18next.addResourceBundle("zh", NS_PRESENTATIONAL_BRICKS, zh);
