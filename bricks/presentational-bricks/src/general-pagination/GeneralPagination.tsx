import React from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import style from "./index.module.css";
import classNames from "classnames";

interface GeneralPaginationProps {
  configProps?: PaginationProps;
  onlyShowTotal?: boolean;
  page: number;
  pageSize: number;
  total: number;
  handleOnChange: (page: number, size: number) => void;
}

export function GeneralPagination(
  props: GeneralPaginationProps
): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  const showTotal = (totals: number): React.ReactElement => {
    return (
      <span className={style.totalText}>
        {t(K.PAGINATION_TOTAL_TEXT)}{" "}
        <strong className={style.total}>{totals}</strong>{" "}
        {t(K.PAGINATION_TOTAL_UNIT)}
      </span>
    );
  };

  // 默认分页配置
  const defaultPagination: PaginationProps = {
    showTotal,
    current: props.page ?? 1,
    pageSize: props.pageSize ?? 10,
    total: props.total,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    onChange: props.handleOnChange,
  };

  const configProps = { ...defaultPagination, ...(props.configProps || {}) };

  return (
    <Pagination
      {...configProps}
      className={classNames({
        [style.onlyShowTotal]: props.onlyShowTotal,
      })}
    />
  );
}
