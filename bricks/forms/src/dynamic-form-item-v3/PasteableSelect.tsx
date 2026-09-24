import React, { useMemo } from "react";
import { Select, Modal, SelectProps } from "antd";
import _ from "lodash";
interface PasteableSelectProps
  extends Omit<SelectProps<any>, "value" | "onChange"> {
  value?: any;
  onChange?: (value: any) => void;
  options?: any[];
}

export const PasteableSelect: React.FC<PasteableSelectProps> = (props) => {
  const { value, onChange, options, mode, tokenSeparators, children, ...rest } =
    props;

  const castValue = (val: any) => {
    if (!options || options.length === 0) return val;
    const firstOpt = options[0];
    if (typeof firstOpt.value === "number") {
      const num = Number(val);
      return isNaN(num) ? val : num;
    }
    return String(val);
  };

  const internalValue = useMemo(() => {
    if (value === undefined || value === null || value === "") {
      return mode === "multiple" || mode === "tags" ? [] : undefined;
    }

    let valArray: any[] = [];
    if (Array.isArray(value)) {
      valArray = value;
    } else if (
      typeof value === "string" &&
      (mode === "multiple" || mode === "tags")
    ) {
      valArray = value.split(",").filter(Boolean);
    } else {
      valArray = [value];
    }

    const processedArray = valArray.map((v) => castValue(v));
    return mode !== "multiple" && mode !== "tags"
      ? processedArray[0]
      : processedArray;
  }, [value, mode, options]);

  const handlePaste = (e: React.ClipboardEvent) => {
    if (mode !== "multiple" && mode !== "tags") return;
    const pastedText = e.clipboardData.getData("text");
    if (!pastedText) return;
    e.preventDefault();

    const separators = Array.from(
      new Set([...(tokenSeparators || [",", " "]), "\n", "\r"])
    );
    const escaped = separators
      .map((s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const items = pastedText
      .split(new RegExp(`(${escaped})`))
      .map((v) => v.trim())
      .filter((v) => v && !separators.includes(v));

    const nextValues = [...(Array.isArray(internalValue) ? internalValue : [])];
    const invalidItems: string[] = [];

    items.forEach((item) => {
      const safeItem = String(item || "").toLowerCase();
      const found = options?.find((opt: any) => {
        const optLabel =
          opt.label != null ? String(opt.label).toLowerCase() : "";
        const optValue =
          opt.value != null ? String(opt.value).toLowerCase() : "";
        return optLabel === safeItem || optValue === safeItem;
      });

      if (found) {
        if (!nextValues.some((v) => String(v) === String(found.value))) {
          nextValues.push(found.value);
        }
      } else if (mode === "tags") {
        if (!nextValues.some((v) => String(v) === String(item))) {
          nextValues.push(item);
        }
      } else {
        invalidItems.push(item);
      }
    });

    onChange?.(nextValues);
    if (invalidItems.length > 0 && mode !== "tags") {
      Modal.warning({
        title: "提示",
        width: 600,
        content: (
          <div>
            无效数据,重复数据：
            <span
              style={{
                paddingLeft: "3px",
                paddingRight: "3px",
                color: "#fc5043",
                fontWeight: "normal",
                backgroundColor: "#ffeeed",
                borderRadius: "2px",
              }}
            >
              {_.escape(invalidItems?.join(","))}
            </span>
          </div>
        ),
        okText: "确定",
        okType: "primary",
      });
    }
  };

  return (
    <div onPaste={handlePaste}>
      <Select
        {...rest}
        mode={mode}
        tokenSeparators={tokenSeparators}
        value={internalValue}
        onChange={(val) => onChange?.(val)}
      >
        {children}
      </Select>
    </div>
  );
};
