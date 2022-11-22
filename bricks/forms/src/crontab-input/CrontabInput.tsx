import React, { useEffect, useState, forwardRef } from "react";
import { Input } from "antd";
import { ValidationRule } from "@ant-design/compatible/lib/form";
import crontab from "@next-libs/crontab";
import { useCrontab, validateCrontab, parseCrontab } from "./useCrontab";
import {
  FormItemWrapperProps,
  FormItemWrapper,
  AbstractGeneralFormElement,
} from "@next-libs/forms";
import style from "./index.module.css";
import { NS_FORMS, K } from "../i18n/constants";
import i18n from "i18next";

export type CrontabType = "minute" | "hour" | "date" | "month" | "dow";

export interface CrontabInputProps
  extends FormItemWrapperProps,
    CrontabInputItemProps {
  formElement?: AbstractGeneralFormElement;
}

export interface CrontabInputItemProps {
  value?: string;
  disabledSet?: CrontabType[];
  onChange?: (value: string) => void;
}

function CrontabInputItem(
  props: CrontabInputItemProps,
  ref: React.RefObject<HTMLDivElement>
): React.ReactElement {
  const [{ minute, hour, date, month, dow }, setChange] = useCrontab(
    props.value
  );
  const { disabledSet = [] } = props;
  const [humanizeCrontab, setHumanizeCrontab] = useState("");

  const triggerChange = (type: string, value: string) => {
    const time = Object.assign(
      { minute, hour, date, month, dow },
      { [type]: value }
    );
    props.onChange &&
      props.onChange(
        `${time.minute} ${time.hour} ${time.date} ${time.month} ${time.dow}`
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const type = e.target.name;
    setChange(type, value);
    triggerChange(type, value);
  };

  useEffect(() => {
    const crontabObj = { minute, hour, date, month, dow };
    if (validateCrontab(crontabObj)) {
      setHumanizeCrontab(crontab.format(crontabObj));
    } else {
      setHumanizeCrontab("");
    }
  }, [minute, hour, month, date, dow]);

  return (
    <div className={style.crontabContainer} ref={ref}>
      <div>
        <label>{i18n.t(`${NS_FORMS}:${K.MINUTE}`, "分钟")} </label>
        <Input
          disabled={disabledSet.includes("minute")}
          name="minute"
          onChange={handleChange}
          value={minute}
        />
      </div>

      <div>
        <label>{i18n.t(`${NS_FORMS}:${K.HOUR}`, "小时")}</label>
        <Input
          disabled={disabledSet.includes("hour")}
          name="hour"
          onChange={handleChange}
          value={hour}
        />
      </div>

      <div>
        <label>{i18n.t(`${NS_FORMS}:${K.DAY}`, "天")}</label>
        <Input
          disabled={disabledSet.includes("date")}
          name="date"
          onChange={handleChange}
          value={date}
        />
      </div>

      <div>
        <label>{i18n.t(`${NS_FORMS}:${K.MONTH}`, "月")}</label>
        <Input
          disabled={disabledSet.includes("month")}
          name="month"
          onChange={handleChange}
          value={month}
        />
      </div>

      <div>
        <label>{i18n.t(`${NS_FORMS}:${K.WEEK}`, "星期")}</label>
        <Input
          disabled={disabledSet.includes("dow")}
          name="dow"
          onChange={handleChange}
          value={dow}
        />
      </div>
      <div className={style.formatText}>{humanizeCrontab}</div>
    </div>
  );
}

export const CrontabInputWrapper = forwardRef(CrontabInputItem);

export function CrontabInput(props: CrontabInputProps): React.ReactElement {
  const [, setForceUpdate] = useState();

  const validatorFn = (
    rule: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    if (validateCrontab(parseCrontab(value))) {
      callback();
    } else {
      callback(
        i18n.t(`${NS_FORMS}:${K.CORRECT_CRONT_MSG}`, "请填写正确的时间格式")
      );
    }
    // only used for trigger children component re-render to update validate states
    setForceUpdate({});
  };

  const builtInValidator: Pick<ValidationRule, "validator" | "message">[] = [
    { validator: validatorFn },
  ];

  return (
    <FormItemWrapper
      {...props}
      validator={
        props.validator
          ? builtInValidator.concat(props.validator)
          : builtInValidator
      }
    >
      <CrontabInputWrapper
        value={props.value}
        disabledSet={props.disabledSet}
        onChange={props.onChange}
      />
    </FormItemWrapper>
  );
}
