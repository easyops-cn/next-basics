import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { filterBricks } from "./filterBrick";
import { BrickItem } from "../BrickLibrary/BrickItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { useBuilderUIContext } from "../BuilderUIContext";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { Empty } from "antd";
import { isEmpty, compact } from "lodash";
import { chartStory } from "../constants";
import styles from "./AdvancedBrickLibrary.module.css";

interface AdvancedBrickLibraryProps {
  onDraggingChange?: (isDragging: boolean) => void;
}

export function LegacyAdvancedBrickLibrary(
  { onDraggingChange }: AdvancedBrickLibraryProps,
  ref: React.Ref<any>
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const {
    appId,
    brickList,
    storyList,
    enabledInstalledBricks,
    stateOfInstalledBricks,
  } = useBuilderUIContext();
  const [q, setQ] = useState<string>();
  const [category, setCategory] = useState<string>();
  const searchRef = useRef<any>();
  const rootNode = useBuilderNode({ isRoot: true });

  const handleSearch = (value: string): void => {
    setQ(value);
  };

  const handleSearchWithGroup = (value: string, category: string) => {
    searchRef.current?.handleSearch(value);
    setCategory(category);
  };

  useImperativeHandle(ref, () => ({
    handleSearchWithGroup,
  }));

  const filteredBricks = React.useMemo(() => {
    const mergedStroyList = compact(chartStory.concat(storyList));
    return filterBricks({
      q,
      category,
      brickList,
      storyList: mergedStroyList,
      installedBricks:
        enabledInstalledBricks && stateOfInstalledBricks.status === "ok"
          ? stateOfInstalledBricks.data
          : [],
      appId,
      rootNode,
    });
  }, [
    storyList,
    q,
    category,
    brickList,
    enabledInstalledBricks,
    stateOfInstalledBricks,
    appId,
    rootNode,
  ]);

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
