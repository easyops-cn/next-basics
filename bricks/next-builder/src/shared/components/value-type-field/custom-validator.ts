import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../../../i18n/constants";
import { TypeFieldItem } from "../../../interface";

export function requiredValidator({ field }: any, v: any, cb: any): void {
  if (!v?.value) {
    cb(
      i18next.t(`${NS_NEXT_BUILDER}:${K.REQUIRED_FIELD_MESSAGE}`, {
        name: field,
      })
    );
  } else {
    cb();
  }
}

export function regexpValidator(
  _: any,
  v: any,
  cb: any,
  item: TypeFieldItem
): void {
  if (new RegExp(item.regex).test(v?.value)) {
    cb();
  } else {
    cb(
      i18next.t(`${NS_NEXT_BUILDER}:${K.REGEX_FIELD_MESSAGE}`, {
        name: item.id,
        regex: item.regex,
      })
    );
  }
}
