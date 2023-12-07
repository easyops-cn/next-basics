import React, { useState } from "react";
import { AutoComplete, Input, Popover, Tooltip } from "antd";
import styles from "./SiteMap.module.css";
import { IHeaderNav } from "./interface";
import { getNavModuleList } from "./nav";
import {
  getFilterNavList,
  setFlags,
  COLUMNS,
  getGroupsList,
} from "./nav/utils";
import { orderBy, keyBy } from "lodash";
import { GeneralIcon } from "@next-libs/basic-components";
import { getHistory, getRuntime } from "@next-core/brick-kit";
import { isIframe } from "./nav/utils";
import { K, NS_NAV_LEGACY } from "../i18n/constants";
import { useTranslation } from "react-i18next";

interface SiteMapProps {
  modelMap: Record<string, any>[];
}

export function SiteMap(props: SiteMapProps): React.ReactElement {
  const flags = getRuntime().getFeatureFlags();
  setFlags(flags);

  const { modelMap } = props;
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation(NS_NAV_LEGACY);

  const showModal = () => {
    setVisible(true);
  };

  const headerNavs: IHeaderNav[] = getNavModuleList(modelMap);
  const autoDataSource: { value: string; text: string }[] =
    getFilterNavList(headerNavs);
  const [dataSource, setDataSource] = useState(autoDataSource);

  const onSearch = (value) => {
    const q = !value ? "" : value.trim().toLowerCase();
    const filterData: { value: string; text: string }[] = !q
      ? [...autoDataSource]
      : autoDataSource.filter(
          (item) =>
            item.text.toLowerCase().includes(q) ||
            item.objectId.toLowerCase().includes(q)
        );

    setDataSource(filterData);
  };

  const map = keyBy(dataSource, "text");
  const onSelect = (text: any) => {
    if (isIframe) {
      window.open(map[text].value, "_parent");
      return;
    }
    window.open(map[text].value, "_self");
  };

  const groupsList = getGroupsList(
    COLUMNS,
    orderBy(headerNavs[0].groups, ["order"], ["asc"])
  );
  const child = dataSource.map((item) => (
    <AutoComplete.Option key={item.value} value={item.text}>
      {item.text}
    </AutoComplete.Option>
  ));
  const content = (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <AutoComplete
            style={{ width: 200 }}
            dropdownStyle={{ width: 300 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder={t(K.SITE_MAP_SEARCH_PLACEHOLDER)}
            optionLabelProp="value"
          >
            {child}
          </AutoComplete>
        </div>
      </div>
      <div className={styles.masonry}>
        {groupsList
          .filter((item) => item.length)
          .map((groups, i) => (
            <div style={{ paddingLeft: 5 }} className={styles.column} key={i}>
              {groups.map((subCategory, index: number) => (
                <div key={index} className={styles.item}>
                  <div className={styles.subCategoryContainer}>
                    <span className={styles.diamondWrapper}></span>
                    <span>{subCategory.category}</span>
                  </div>
                  {subCategory.states.map((item, iIndex: number) => (
                    <div className={styles.itemContainer} key={iIndex}>
                      {
                        <a
                          target={isIframe ? "_parent" : "_self"}
                          href={item.stateName}
                        >
                          {item.text}
                          {item.id === "brickGroup" && (
                            <span className={styles.brickGroupContainer}>
                              <GeneralIcon
                                icon={{
                                  lib: "easyops",
                                  category: "app",
                                  icon: "brick-group",
                                }}
                              />
                            </span>
                          )}
                        </a>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.siteMap}>
        <div className={styles.siteMapTitle}>资源</div>
        <Popover
          placement="bottomRight"
          title={null}
          content={content}
          trigger="click"
        >
          <Tooltip placement="top" title="查看所有">
            <a className={styles.showIcon} onClick={showModal}>
              <GeneralIcon
                icon={{
                  lib: "easyops",
                  category: "app",
                  icon: "all-cmdb",
                }}
              />
            </a>
          </Tooltip>
        </Popover>
      </div>
    </div>
  );
}
