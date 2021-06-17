import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import { isEmpty } from "lodash";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { filterBricks } from "./filterBrick";
import { BrickItem } from "../BrickLibrary/BrickItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { useBuilderUIContext } from "../BuilderUIContext";
import styles from "./AdvancedBrickLibrary.module.css";

interface AdvancedBrickLibraryProps {
  onDraggingChange?: (isDragging: boolean) => void;
}

export function LegacyAdvancedBrickLibrary(
  { onDraggingChange }: AdvancedBrickLibraryProps,
  ref: React.Ref<any>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { appId, brickList, storyList } = useBuilderUIContext();
  const [q, setQ] = useState<string>();
  const [category, setCategory] = useState<string>();
  const searchRef = useRef<any>();
  const rootNode = useBuilderNode({ isRoot: true });

  const handleSearch = (value: string): void => {
    setQ(value);
  };

  const handleSearchWithGroup = (value: string, category: string): void => {
    searchRef.current?.handleSearch(value);
    setCategory(category);
  };

  useImperativeHandle(ref, () => ({
    handleSearchWithGroup,
  }));

  const filteredBricks = React.useMemo(() => {
    return filterBricks({
      q,
      category,
      brickList,
      storyList,
      appId,
      rootNode,
    });
  }, [storyList, q, category, brickList, appId, rootNode]);

  return (
    <div>
      <SearchComponent
        ref={searchRef}
        inputStyle={{ width: 260 }}
        placeholder={t(K.SEARCH_BRICKS_IN_LIBRARY)}
        onSearch={handleSearch}
      />
      {!isEmpty(filteredBricks) ? (
        <div className={styles.brickWrapper}>
          {filteredBricks.map((item) => (
            <li key={item.name} className={styles.itemWrapper}>
              <BrickItem
                brick={item}
                onDraggingChange={onDraggingChange}
                theme="light"
              />
            </li>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

export const AdvancedBrickLibrary = forwardRef(LegacyAdvancedBrickLibrary);
