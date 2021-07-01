import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BlockOutlined } from "@ant-design/icons";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { BuilderCustomTemplateNode } from "@next-core/brick-types";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";
import { searchList } from "../utils/utils";
import { useBuilderUIContext } from "../BuilderUIContext";

import styles from "./TemplateList.module.css";

interface TemplateListProps {
  handleTemplateSelect?: (template: BuilderCustomTemplateNode) => void;
}

export function TemplateList({
  handleTemplateSelect,
}: TemplateListProps): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  const { templateList, onTemplateSelect } = useBuilderUIContext();
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState<string>("");

  const handleQChange = (q: string): void => {
    setQ(q);
  };

  const formattedTemplateList = useMemo(() => {
    if (!templateList) {
      return [];
    }
    return templateList.map((v) => ({
      ...v,
      key: v.id,
    }));
  }, [templateList]);

  const treeData = useMemo(
    () => searchList(formattedTemplateList, q, "title"),
    [formattedTemplateList, q]
  );

  const handleSelect = (node: BuilderCustomTemplateNode): void => {
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
