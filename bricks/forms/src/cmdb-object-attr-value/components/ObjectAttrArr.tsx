import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Input, Row, InputNumber, Select, Radio } from "antd";
import { isNil } from "lodash";
import i18n from "i18next";
interface ObjectAttrArrProps {
  value: any;
  onChange: (newValue?: any) => void;
}

interface ArrValueType {
  regex: string;
  default: [];
  mode: "default" | "tag";
}

export function ObjectAttrArr(props: ObjectAttrArrProps): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const [value, setValue] = React.useState<Partial<ArrValueType>>({
    regex: "",
    default: [],
    mode: "default",
  });

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleValueChange = (value: Partial<ArrValueType>) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <>
      <div>
        {i18n.t(`${NS_FORMS}:${K.REGULAR}`)}
        <Row>
          <Input
            placeholder={i18n.t(`${NS_FORMS}:${K.THIS_IS_NOT_MANDATORY}`)}
            value={value?.regex}
            onChange={(e) =>
              handleValueChange({ ...value, regex: e.target.value })
            }
          />
        </Row>
      </div>
      <div>
        {i18n.t(`${NS_FORMS}:${K.DISPLAY_AS}`)}
        <Row>
          <Radio.Group
            value={value?.mode}
            onChange={(e) =>
              handleValueChange({ ...value, mode: e.target.value })
            }
          >
            <Radio value="default">{i18n.t(`${NS_FORMS}:${K.DEFAULT}`)}</Radio>
            <Radio value="tag">{i18n.t(`${NS_FORMS}:${K.TAG}`)}</Radio>
          </Radio.Group>
        </Row>
      </div>
      <div>
        {t(K.ATTRIBUTE_DEFAULT_VALUE)}
        <Row>
          <Select
            value={value?.default ?? ([] as any)}
            mode="tags"
            style={{ width: "100%" }}
            placeholder={i18n.t(`${NS_FORMS}:${K.ARRAY_LIMIT}`)}
            onChange={(e) => handleValueChange({ ...value, default: e })}
            tokenSeparators={[",", " "]}
            dropdownRender={() => <></>}
          />
        </Row>
      </div>
    </>
  );
}
