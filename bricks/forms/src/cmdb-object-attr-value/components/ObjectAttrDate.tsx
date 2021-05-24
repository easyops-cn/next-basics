import React from "react";
import { I18nContext, useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { DatePicker, Row, Alert } from "antd";
import { isNil } from "lodash";
import moment from "moment";
import styles from "./index.module.css";
import i18n from "i18next";

interface ObjectAttrDateProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface DateValueType {
  default: string;
}

export function ObjectAttrDate(props: ObjectAttrDateProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState<DateValueType>({
    default: "",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: Partial<DateValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      <div>
        {i18n.t(`${NS_FORMS}:${K.FORMAT}`)}
        <Row>
          <Alert
            message="yyyy-mm-dd"
            type="info"
            className={styles.cmdbObjectAttrValueInfo}
          />
        </Row>
      </div>
      <div>
        {t(K.ATTRIBUTE_DEFAULT_VALUE)}
        <Row>
          {value?.default?.length ? (
            <DatePicker
              value={moment(value?.default)}
              placeholder={i18n.t(`${NS_FORMS}:${K.CLICK_TO_SELECT_DATE}`)}
              style={{ width: "100%" }}
              onChange={(date) =>
                handleValueChange({
                  ...value,
                  default: date?.format("YYYY-MM-DD"),
                })
              }
            />
          ) : (
            <DatePicker
              placeholder={i18n.t(`${NS_FORMS}:${K.CLICK_TO_SELECT_DATE}`)}
              style={{ width: "100%" }}
              onChange={(date) =>
                handleValueChange({
                  ...value,
                  default: date?.format("YYYY-MM-DD"),
                })
              }
            />
          )}
        </Row>
      </div>
    </>
  );
}
