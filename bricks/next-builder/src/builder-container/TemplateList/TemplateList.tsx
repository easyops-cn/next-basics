import React, { useMemo, useState } from "react";
import { BuilderCustomTemplateNode } from "@next-core/brick-types";
import { useTranslation } from "react-i18next";
import { BlockOutlined } from "@ant-design/icons";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";
import { searchList } from "../utils/utils";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BrickOptionItem } from "../interfaces";

import styles from "./TemplateList.module.css";

interface TemplateListProps {
  handleTemplateSelect?: (template: BuilderCustomTemplateNode) => void;
}

export function TemplateList({
  handleTemplateSelect,
}: TemplateListProps): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  const { brickList, onTemplateSelect } = useBuilderUIContext();
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState<string>("");

  const handleQChange = (q: string): void => {
    setQ(q);
  };

  const templateList = useMemo(() => {
    if (!brickList) {
      return [];
    }
    return brickList
      .filter((v) => v.type === "customTemplate")
      .map((v) => ({
        ...v,
        key: v.id,
      }));
  }, [brickList]);

  const treeData = useMemo(
    () => searchList(templateList, q, "title"),
    [templateList, q]
  );

  const handleSelect = (selectedProps: BrickOptionItem): void => {
    const node: BuilderCustomTemplateNode = {
      type: "custom-template",
      id: selectedProps.nodeId,
      templateId: selectedProps.id,
    };
    onTemplateSelect?.(node);
    handleTemplateSelect?.(node);
  };

  return (
    <SearchableTree
      list={treeData}
      defaultSelectedKeys={rootNode ? [rootNode.id] : []}
      icon={<BlockOutlined />}
      searchPlaceholder={t(K.SEARCH_TEMPLATE)}
      onSelect={handleSelect}
      onQChange={handleQChange}
      customClassName={styles.customTree}
    />
  );
}
