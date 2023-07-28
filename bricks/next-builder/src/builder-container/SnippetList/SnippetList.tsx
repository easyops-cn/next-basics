import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BlockOutlined } from "@ant-design/icons";
import { BuilderSnippetNode } from "@next-core/brick-types";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";
import { searchList } from "../utils";
import { useBuilderUIContext } from "../BuilderUIContext";

import styles from "./SnippetList.module.css";

interface SnippetListProps {
  handleSnippetSelect?: (snippet: BuilderSnippetNode) => void;
}

export function SnippetList({
  handleSnippetSelect,
}: SnippetListProps): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  const { snippetList, onSnippetSelect } = useBuilderUIContext();
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState<string>("");

  const handleQChange = (q: string): void => {
    setQ(q);
  };

  const formattedSnippetList = useMemo(() => {
    if (!snippetList) {
      return [];
    }
    return snippetList.map((v) => ({
      ...v,
      key: v.id,
    }));
  }, [snippetList]);

  const treeData = useMemo(
    () => searchList(formattedSnippetList, q, "title"),
    [formattedSnippetList, q]
  );

  const handleSelect = (node: BuilderSnippetNode): void => {
    onSnippetSelect?.(node);
    handleSnippetSelect?.(node);
  };

  return (
    <SearchableTree
      list={treeData}
      defaultSelectedKeys={rootNode ? [rootNode.id] : []}
      icon={<BlockOutlined />}
      searchPlaceholder={t(K.SEARCH_SNIPPET)}
      onSelect={handleSelect}
      onQChange={handleQChange}
      customClassName={styles.customTree}
    />
  );
}
