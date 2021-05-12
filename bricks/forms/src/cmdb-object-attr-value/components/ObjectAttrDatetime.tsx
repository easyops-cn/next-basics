import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { DatePicker, Row, Alert } from "antd";
import { isNil } from "lodash";
import moment from "moment";

interface ObjectAttrDatetimeProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface DateTimeType {
  default: string;
}

export function ObjectAttrDatetime(
  props: ObjectAttrDatetimeProps
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState<DateTimeType>({
    default: "",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: Partial<DateTimeType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      <div>
        格式：
        <Row>
          <Alert
            message="yyyy-mm-dd hh:mm:ss"
            type="info"
            style={{
              backgroundColor: "#f5f5f5",
              borderColor: "#d9d9d9",
              color: "#757575",
            }}
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
              onChange={(date, dateString) =>
                handleValueChange({ ...value, default: dateString })
              }
              showTime
            />
          ) : (
            <DatePicker
              placeholder="date,点击选择"
              style={{ width: "100%" }}
              onChange={(date, dateString) =>
                handleValueChange({ ...value, default: dateString })
              }
              showTime
            />
          )}
        </Row>
      </div>
    </>
  );
}
