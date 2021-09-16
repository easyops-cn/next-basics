import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Tooltip, Button } from "antd";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EventConfig,
  EventsDoc,
} from "../../../shared/visual-events/interfaces";
import styles from "./AddEventBtn.module.css";
import sharedStyle from "../../EventsEditor.module.css";

export interface AddEventBtnProps {
  eventList: EventConfig[];
  eventDocInfo?: EventsDoc[];
  onClick?: (key: string) => void;
}

export function AddEventBtn(props: AddEventBtnProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const { eventList, eventDocInfo, onClick } = props;

  const btnDropdownList =
    eventDocInfo?.filter(
      (item) => !eventList?.some((row) => row.name === item.type)
    ) ?? [];
  const hasMenu = btnDropdownList.length > 0;

  const btnMenu = (
    <Menu onClick={(e) => onClick?.(e.key as string)}>
      {btnDropdownList.map((item) => (
        <Menu.Item key={item.type} title={item.description}>
          <div className={styles.menuItem}>
            <FontAwesomeIcon
              icon="bolt"
              style={{ marginRight: 12 }}
              className={sharedStyle.eventIcon}
            />
            {item.type}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={btnMenu} trigger={["click"]} disabled={!hasMenu}>
      <Tooltip title={!hasMenu && t(K.NO_EVENTS_TO_ADD)}>
        <Button type="link" disabled={!hasMenu}>
          <FontAwesomeIcon className={sharedStyle.addIcon} icon="plus" />
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
