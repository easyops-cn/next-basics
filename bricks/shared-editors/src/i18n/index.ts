import i18next from "i18next";
import { NS_SHARED_EDITORS } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_SHARED_EDITORS, en);
i18next.addResourceBundle("zh", NS_SHARED_EDITORS, zh);
