import React, { useCallback, useMemo } from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import {
  DownOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { GeneralIcon } from "@next-libs/basic-components";
import classNames from "classnames";
import { GeneralButtonType } from "../shared/intefaces";

import styles from "./general-custom-buttons.editor.module.css";
import { isEmpty } from "lodash";
import { MenuIcon } from "@next-core/brick-types";

interface CustomButtonProps {
  buttonType?: GeneralButtonType;
  isDropdown?: boolean;
  icon: MenuIcon | string;
  text: string;
}

interface GeneralCustomButtonsProperties {
  customButtons?: CustomButtonProps[];
  isMoreButton: true;
}

interface BaseButtonProps {
  type?: GeneralButtonType;
}

interface dropdownBtnProps {
  isMoreButton?: true;
}

export function BaseButton({
  type,
  children,
}: React.PropsWithChildren<BaseButtonProps>): React.ReactElement {
  return (
    <div className={classNames(styles.baseButton, styles[type])}>
      {children}
    </div>
  );
}

export function DropdownBtn({
  isMoreButton,
}: dropdownBtnProps): React.ReactElement {
  return (
    <>
      <BaseButton>
        {isMoreButton ? (
          <EllipsisOutlined />
        ) : (
          <>
            <SettingOutlined style={{ marginRight: 5 }} /> 管理{" "}
            <DownOutlined style={{ marginLeft: 5 }} />
          </>
        )}
      </BaseButton>
    </>
  );
}

export function GeneralCustomButtonsEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralCustomButtonsProperties>({ nodeUid });

  const { customButtons, isMoreButton } = node.$$parsedProperties;
  const hasDropdown = customButtons?.some((item) => item.isDropdown);

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.customContainer}>
        {isEmpty(customButtons) ? (
          <BaseButton>{node.alias}</BaseButton>
        ) : (
          customButtons
            ?.filter((item) => !item.isDropdown)
            ?.map((item, index) => (
              <BaseButton key={index} type={item.buttonType}>
                {item.icon && (
                  <GeneralIcon
                    icon={
                      typeof item.icon === "string"
                        ? { lib: "antd", icon: item.icon }
                        : item.icon
                    }
                    style={{ marginRight: 5 }}
                  />
                )}
                {item.text}
              </BaseButton>
            ))
        )}
        {hasDropdown && <DropdownBtn isMoreButton={isMoreButton} />}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.general-custom-buttons--editor",
  EditorElementFactory(GeneralCustomButtonsEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
