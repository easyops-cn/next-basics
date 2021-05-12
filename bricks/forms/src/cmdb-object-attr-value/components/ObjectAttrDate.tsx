import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { DatePicker, Row, Alert } from "antd";
import { isNil } from "lodash";
import moment from "moment";
import styles from "./index.module.css";

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
        格式：
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
              placeholder="date,点击选择"
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
              placeholder="date,点击选择"
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
