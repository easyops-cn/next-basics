import React, { useMemo, useState } from "react";
import { BuilderCustomTemplateNode } from "@next-core/brick-types";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { useTranslation } from "react-i18next";
import { BlockOutlined } from "@ant-design/icons";
import { SearchableTree } from "../components/SearchableTree/SearchableTree";
import { searchList } from "../utils/utils";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { useBuilderUIContext } from "../BuilderUIContext";

import styles from "./TemplateList.module.css";

interface TemplateListProps{
  handleTemplateSelect?: (template: BuilderCustomTemplateNode) => void;
}

export function TemplateList({
  handleTemplateSelect
}:TemplateListProps): React.ReactElement{
  const rootNode = useBuilderNode({ isRoot: true });
  const { brickList, onTemplateSelect } = useBuilderUIContext();
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = useState<string>("");

  const handleQChange = (q: string) => {
    setQ(q);
  };

  const templateList = useMemo(()=>{
    if(!brickList){
      return [];
    }
    return brickList.filter(v=>v.type==="customTemplate").map(v=>(
      {
        ...v,
        key: v.id,
      }
    ));
  },[
    brickList
  ]);

  const treeData = useMemo(()=>searchList(templateList,q,"name"),[
    templateList,
    q
  ]);

  const handleSelect = (selectedProps: any) => {
    onTemplateSelect?.(selectedProps);
    handleTemplateSelect?.(selectedProps);
  }

  return (
    <SearchableTree 
      list={treeData}
      defaultSelectedKeys={rootNode ? [rootNode.id] : []}
      icon={<BlockOutlined />}
      field="name"
      searchPlaceholder={t(K.SEARCH_TEMPLATE)}
      onSelect={handleSelect}
      onQChange={handleQChange}
      customClassName={styles.customTree}
    />
  );
}