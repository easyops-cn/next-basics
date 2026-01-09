import i18next from "i18next";
import { NS_FORMS } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.init({
  //强制所有英语变体都只加载 'en'
  load: "languageOnly",
});
i18next.addResourceBundle("en", NS_FORMS, en);
i18next.addResourceBundle("zh", NS_FORMS, zh);
