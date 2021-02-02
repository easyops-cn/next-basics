import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BrickOptionItem, GroupedBricks } from "../interfaces";
import { searchBricks } from "./searchBricks";
import { BrickItem } from "./BrickItem";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";

import styles from "./BrickLibrary.module.css";

interface BrickLibraryProps {
  brickList?: BrickOptionItem[];
}

export function BrickLibrary({
  brickList,
}: BrickLibraryProps): React.ReactElement {
  const [q, setQ] = React.useState<string>();

  const handleSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQ(event.target.value);
    },
    []
  );

  const filteredGroups = React.useMemo<GroupedBricks[]>(
    () => searchBricks(q, brickList),
    [brickList, q]
  );

  return (
    <ToolboxPane title="Library">
      <div className={styles.searchWrapper}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search bricks..."
          value={q}
          onChange={handleSearch}
        />
      </div>
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
