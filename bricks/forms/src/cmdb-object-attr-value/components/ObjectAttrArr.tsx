import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Input, Row, InputNumber, Select, Radio } from "antd";
import { isNil } from "lodash";

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
        正则：
        <Row>
          <Input
            placeholder="可不填"
            value={value?.regex}
            onChange={(e) =>
              handleValueChange({ ...value, regex: e.target.value })
            }
          />
        </Row>
      </div>
      <div>
        显示为：
        <Row>
          <Radio.Group
            value={value?.mode}
            onChange={(e) =>
              handleValueChange({ ...value, mode: e.target.value })
            }
          >
            <Radio value="default">默认</Radio>
            <Radio value="tag">标签</Radio>
          </Radio.Group>
        </Row>
      </div>
      <div>
        属性默认值：
        <Row>
          <Select
            value={value?.default}
            mode="tags"
            style={{ width: "100%" }}
            placeholder="输入数组，用逗号或空格分隔保存"
            onChange={(e) => handleValueChange({ ...value, default: e })}
            tokenSeparators={[",", " "]}
            dropdownRender={() => <></>}
          ></Select>
        </Row>
      </div>
    </>
  );
}
