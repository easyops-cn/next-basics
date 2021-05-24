import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { DatePicker, Row, Alert } from "antd";
import { isNil } from "lodash";
import moment from "moment";
import i18n from "i18next";
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
        {i18n.t(`${NS_FORMS}:${K.FORMAT}`)}
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
              placeholder={i18n.t(`${NS_FORMS}:${K.CLICK_TO_SELECT_DATE}`)}
              style={{ width: "100%" }}
              onChange={(date, dateString) =>
                handleValueChange({ ...value, default: dateString })
              }
              showTime
            />
          ) : (
            <DatePicker
              placeholder={i18n.t(`${NS_FORMS}:${K.CLICK_TO_SELECT_DATE}`)}
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
