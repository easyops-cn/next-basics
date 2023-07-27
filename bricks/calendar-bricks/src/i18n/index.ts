import i18next from "i18next";
import { NS_CALENDAR_BRICKS } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_CALENDAR_BRICKS, en);
i18next.addResourceBundle("zh", NS_CALENDAR_BRICKS, zh);
