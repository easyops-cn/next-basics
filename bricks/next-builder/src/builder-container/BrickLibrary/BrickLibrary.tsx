import React from "react";
import { BrickOptionItem, GroupedBricks } from "../interfaces";
import { searchBricks } from "./searchBricks";
import { BrickItem } from "./BrickItem";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

import styles from "./BrickLibrary.module.css";

interface BrickLibraryProps {
  brickList?: BrickOptionItem[];
}

export function BrickLibrary({
  brickList,
}: BrickLibraryProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [q, setQ] = React.useState<string>();

  const handleSearch = (value: string): void => {
    setQ(value);
  };

  const filteredGroups = React.useMemo<GroupedBricks[]>(
    () => searchBricks(q, brickList),
    [brickList, q]
  );

  return (
    <ToolboxPane title={t(K.LIBRARY)}>
      <SearchComponent
        placeholder={t(K.SEARCH_BRICKS_IN_LIBRARY)}
        onSearch={handleSearch}
      />
      <div className={styles.resultWrapper}>
        <ul className={styles.groupList}>
          {filteredGroups.map((group) => (
            <li key={group.scope}>
              <div className={styles.groupName}>{group.scope}</div>
              <ul className={styles.brickList}>
                {group.bricks.map((brick) => (
                  <li key={brick.name}>
                    <BrickItem brick={brick} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </ToolboxPane>
  );
}
