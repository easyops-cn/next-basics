import React from "react";
import { Sidebar, GeneralIcon } from "@next-libs/basic-components";
import style from "./index.module.css";
import { SidebarMenu, UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { Tooltip } from "antd";
import { getRuntime } from "@next-core/brick-kit";

const featureFlags = getRuntime()?.getFeatureFlags();
interface SubMenuProps {
  dataSource: SidebarMenu;
  topOperationConf?: { useBrick: UseBrickConf };
  isThirdLevel?: boolean;
}

export function SubMenu({
  dataSource,
  topOperationConf,
  isThirdLevel,
}: SubMenuProps): React.ReactElement {
  const thirdLevelHeaderTitle = React.useRef();
  const enableCompactUi = featureFlags["support-ui-8.2-compact-layout"];

  const [isShowTooltip, setIsShowTooltip] = React.useState(false);
  React.useEffect(() => {
    const thirdLevelHeaderTitleRef = thirdLevelHeaderTitle?.current;
    if (
      isThirdLevel &&
      thirdLevelHeaderTitleRef?.scrollHeight >
        thirdLevelHeaderTitleRef?.offsetHeight
    ) {
      setIsShowTooltip(true);
    }
  }, []);

  return (
    <div
      className={`${style.subMenuContainer} ${
        isThirdLevel ? style.isThirdLevel : ""
      } ${enableCompactUi ? style.isCompact : ""}`}
    >
      {(dataSource.icon || dataSource.title || topOperationConf?.useBrick) && (
        <div className={style.header}>
          <div>
            <GeneralIcon icon={dataSource.icon} />
            {isThirdLevel ? (
              <Tooltip
                placement="bottomLeft"
                title={isShowTooltip ? dataSource.title : ""}
              >
                <span
                  ref={thirdLevelHeaderTitle}
                  className={style.isThirdLevelHeaderTitle}
                >
                  {dataSource.title}
                </span>
              </Tooltip>
            ) : (
              <span className={style.headerTitle}>{dataSource.title}</span>
            )}
          </div>

          {topOperationConf?.useBrick && (
            <BrickAsComponent
              useBrick={topOperationConf.useBrick}
            ></BrickAsComponent>
          )}
        </div>
      )}
      <Sidebar
        menuItems={dataSource.menuItems}
        inlineIndent={16}
        theme="light"
      />
    </div>
  );
}
