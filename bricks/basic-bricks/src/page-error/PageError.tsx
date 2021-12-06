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

enum HttpStatusCode {
  FORBIDDEN = "403",
  NOT_FOUND = "404",
  SERVER_ERROR = "500",
}

interface CategoryType {
  [n: string]: ItemHttpType;
}

// 满足现有插画库所拥有的插画状态，如需添加请按照现有格式添加
const httpCodeIllustrationMap: CategoryType = {
  [HttpStatusCode.FORBIDDEN]: {
    name: "http-403",
    title: "无访问权限",
  },
  [HttpStatusCode.NOT_FOUND]: {
    name: "http-404",
    title: "未找到页面",
  },
  [HttpStatusCode.SERVER_ERROR]: {
    name: "http-500",
    title: "服务端异常",
  },
};

export function PageError(props: PageErrorProps): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const httpCodeItem: ItemHttpType = httpCodeIllustrationMap[props.code];
  const isException = !!httpCodeItem;
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      {isException ? (
        <BrickIllustration
          mode="guide"
          category="exception"
          name={httpCodeItem?.name}
          header={{ title: httpCodeItem?.title }}
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
