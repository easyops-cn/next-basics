import React from "react";
import { useTranslation } from "react-i18next";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";
import { BrickIllustration } from "../../../presentational-bricks/src/brick-illustration/BrickIllustration";
interface PageErrorProps {
  error: string;
  code: string;
}

interface ItemHttpType {
  name: string;
  title: string;
}
interface CategoryType {
  [n: string]: ItemHttpType;
}

const FORBIDDEN = "403";
const NOT_FOUND = "404";
const SERVER_ERROR = "500";

// 满足现有插画库所拥有的插画状态，如需添加请按照现有格式添加
const httpCodeObj: CategoryType = {
  [FORBIDDEN]: {
    name: "http-403",
    title: "无访问权限",
  },
  [NOT_FOUND]: {
    name: "http-404",
    title: "未找到页面",
  },
  [SERVER_ERROR]: {
    name: "http-500",
    title: "服务端异常",
  },
};

export function PageError(props: PageErrorProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const isException: boolean = Object.keys(httpCodeObj).includes(props.code);
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      {isException ? (
        <BrickIllustration
          mode="guide"
          category="exception"
          name={httpCodeObj[props.code]?.name}
          header={{ title: httpCodeObj[props.code]?.title }}
        ></BrickIllustration>
      ) : (
        <>
          <p style={{ fontSize: "150%" }}>{t(K.PAGE_ERROR_TITLE)}</p>
          <p>{props.error}</p>
        </>
      )}
    </div>
  );
}
