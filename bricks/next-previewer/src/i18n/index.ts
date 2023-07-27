import i18next from "i18next";
import { NS_NEXT_PREVIEWER } from "./constants";
import en from "./locales/en";
import zh from "./locales/zh";

i18next.addResourceBundle("en", NS_NEXT_PREVIEWER, en);
i18next.addResourceBundle("zh", NS_NEXT_PREVIEWER, zh);
