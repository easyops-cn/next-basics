import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import {
  BrickEventHandler,
  UseProviderEventHandler,
} from "@next-core/brick-types";
import { getHandlerName } from "../../processor";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { EditorContext } from "../../EventsEditor";
import styles from "./HandlerItem.module.css";

export enum HandlerType {
  BuiltinAction = "builtinAction",
  UseProvider = "useProvider",
  ExectuteMethod = "exectuteMethod",
  SetPorps = "setPorps",
  Unkown = "unkown",
}

export interface HandlerItemProps {
  type?: HandlerType;
  handler: BrickEventHandler;
}

const handlerIconMap = {
  [HandlerType.BuiltinAction]: "code",
  [HandlerType.UseProvider]: "database",
  [HandlerType.ExectuteMethod]: "star",
  [HandlerType.SetPorps]: "equals",
  [HandlerType.Unkown]: "question",
};

export function HandlerItem(props: HandlerItemProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { type, handler } = props;
  const context = useContext(EditorContext);

  const handlerClick = (handler: BrickEventHandler): void => {
    context?.onEdit(handler);
  };

  return (
    <div className={styles[type]}>
      <div className={styles.handleContainer}>
        <FontAwesomeIcon
          icon={handlerIconMap[type] as FontAwesomeIconProps["icon"]}
          className={styles.icon}
        />
        <div className={styles.handler} onClick={() => handlerClick(handler)}>
          {getHandlerName(handler)}
        </div>
      </div>
      {(handler as UseProviderEventHandler).callback && (
        <div className={styles.callback}></div>
      )}
    </div>
  );
}
