import React from "react";
import { useTranslation } from "react-i18next";
import { getRuntime } from "@next-core/brick-kit";
import { K, NS_DEVELOPERS } from "../i18n/constants";
import releaseMd from "../docs/RELEASE.md";
import { BrickDoc } from "../components/BrickDoc/BrickDoc";

interface DockBookProps {
  docId: string;
}

export function DocBook({ docId }: DockBookProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);

  let doc: string;
  let title: string;

  /** 在这里做 docId 到文档的映射，之前的文档都已经迁移，相关映射已删除，后面有需要按照如下示例添加
   * case "storyboards":
   *   doc = storyboardsMd;
   *   title = "Storyboards";
   *   break;
   */

  // eslint-disable-next-line no-empty
  switch (docId) {
    case "release":
      doc = releaseMd;
      title = t(K.RELEASE);
      break;
  }

  React.useEffect(() => {
    getRuntime().appBar.setPageTitle(title);
  }, [title]);

  if (!doc) {
    throw new Error("Oops, doc not found");
  }

  return <BrickDoc doc={doc}></BrickDoc>;
}
