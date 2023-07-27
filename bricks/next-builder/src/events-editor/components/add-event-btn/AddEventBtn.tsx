import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Tooltip, Button, Input } from "antd";
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
  enableCustomEvent?: boolean;
}

const CUSTOM_EVENT_KEY = "custom-event-key";

export function AddEventBtn(props: AddEventBtnProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const { eventList, eventDocInfo, onClick, enableCustomEvent } = props;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string>();

  const btnDropdownList =
    eventDocInfo?.filter(
      (item) => !eventList?.some((row) => row.name === item.type)
    ) ?? [];
  const hasMenu = btnDropdownList.length > 0 || enableCustomEvent;

  const handleVisibleChange = (flag: boolean): void => {
    setVisible(flag);
  };

  const handleMenuClick = (key: string): void => {
    // istanbul ignore else
    if (key !== CUSTOM_EVENT_KEY) {
      setVisible(false);
      onClick?.(key);
    }
  };

  const handleInputEnter = (): void => {
    // istanbul ignore else
    if (value) {
      onClick?.(value);
      setVisible(false);
      setValue("");
    }
  };

  const btnMenu = (
    <Menu onClick={(e) => handleMenuClick(e.key as string)}>
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
      {enableCustomEvent && (
        <>
          <Menu.Divider />
          <Menu.Item key={CUSTOM_EVENT_KEY}>
            <Input
              onPressEnter={handleInputEnter}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t(K.VISUAL_EVENT_ADD_CUSTOM_EVENT_PLACEHOLDER)}
            />
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Dropdown
      overlay={btnMenu}
      trigger={["click"]}
      disabled={!hasMenu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <Tooltip title={!hasMenu && t(K.NO_EVENTS_TO_ADD)}>
        <Button type="link" disabled={!hasMenu}>
          <FontAwesomeIcon className={sharedStyle.addIcon} icon="plus" />
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
