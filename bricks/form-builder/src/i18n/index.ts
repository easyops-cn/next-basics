import i18next from "i18next";
import { NS_FORM_BUILDER } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_FORM_BUILDER, en);
i18next.addResourceBundle("zh", NS_FORM_BUILDER, zh);
