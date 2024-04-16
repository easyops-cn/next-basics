import React, { useState, useEffect } from "react";
import moment from "moment";
import { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import style from "./index.module.css";

export interface CurrentTimeProps {
  type: string;
  format?: string;
  icon?: MenuIcon;
}

export function CurrentTime(props: CurrentTimeProps): React.ReactElement {
  const { type, format, icon } = props;
  const [timer, setTimer] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRefresh((r) => r + 1);
      setTimer(
        type === "timestamp"
          ? `${Date.now()}`
          : moment(Date.now()).format(format)
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [refresh]);

  return (
    <div className={style.container}>
      {icon ? <GeneralIcon icon={icon} /> : null}
      {timer}
    </div>
  );
}
