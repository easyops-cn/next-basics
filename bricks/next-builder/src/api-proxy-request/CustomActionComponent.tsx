import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "./index.module.css";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { omit } from "lodash";

const ITEM_KEY = "$key";

interface CustomActionComponentProps {
  label?: string;
  value: Record<string, string>;
  params?: Record<string, any>;
  onChange: (v: Omit<CustomActionItem, "$key">[]) => void;
}

export type CustomActionItem = {
  key?: string;
  value?: string;
  [ITEM_KEY]: number;
};

export interface CustomActionRef {
  addItem: (item?: Omit<CustomActionItem, "$key">) => void;
}

export function LeacyCustomActionComponent(
  { label, value, params, onChange }: CustomActionComponentProps,
  ref: React.Ref<CustomActionRef>
): React.ReactElement {
  const [list, setList] = useState<CustomActionItem[]>([]);
  const cacheListRef = useRef<CustomActionItem[]>();

  const filterItem = useCallback((list: CustomActionItem[]) => {
    return list.map((item) => omit(item, [ITEM_KEY])).filter(Boolean);
  }, []);

  const handleInput = useCallback(
    (item: CustomActionItem, key: string, value: string): void => {
      cacheListRef.current = cacheListRef.current.map((i) => ({
        ...i,
        ...(i[ITEM_KEY] === item[ITEM_KEY]
          ? {
              [key]: value,
            }
          : {}),
      }));
      onChange(filterItem(cacheListRef.current));
    },
    [filterItem, onChange]
  );

  const handleAddItem = (item?: Omit<CustomActionItem, "$key">): void => {
    const matchItem =
      item &&
      cacheListRef.current.find(
        (i) => i.key === item.key || (!i.key && !i.value)
      );
    if (matchItem) {
      cacheListRef.current = cacheListRef.current.map((i) => ({
        ...i,
        ...(i.key === item?.key || (!i.key && !i.value) ? item : {}),
      }));
    } else {
      cacheListRef.current = cacheListRef.current.concat({
        ...(item ?? {}),
        [ITEM_KEY]: Math.random(),
      });
    }
    setList(cacheListRef.current);
  };

  const handleDeleteItem = (item: CustomActionItem): void => {
    cacheListRef.current = cacheListRef.current.filter(
      (i) => i[ITEM_KEY] !== item[ITEM_KEY]
    );
    cacheListRef.current = cacheListRef.current.length
      ? cacheListRef.current
      : [{ [ITEM_KEY]: Math.random() }];
    setList(cacheListRef.current);

    onChange(filterItem(cacheListRef.current));
  };

  useEffect(() => {
    const list = Object.entries(params ?? {}).map(([k, v]) => ({
      key: k,
      value: v,
      [ITEM_KEY]: Math.random(),
    }));

    cacheListRef.current = list.length
      ? list
      : [
          {
            [ITEM_KEY]: Math.random(),
          },
        ];
    setList(cacheListRef.current);
  }, [params]);

  useEffect(() => {
    if (value) {
      cacheListRef.current = Object.entries(value).map(([k, v]) => ({
        key: k,
        value: v,
        [ITEM_KEY]: Math.random(),
      }));
      cacheListRef.current = list.length
        ? list
        : [
            {
              [ITEM_KEY]: Math.random(),
            },
          ];
      setList(cacheListRef.current);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    addItem: (item?: Omit<CustomActionItem, "$key">) => handleAddItem(item),
  }));

  return (
    <div className={styles.customActionWrapper}>
      {label && (
        <div className={styles.customHeader}>
          <div className={styles.customTitle}>{label}</div>
          <div className={styles.toolbar}>
            <PlusCircleOutlined onClick={() => handleAddItem()} />
          </div>
        </div>
      )}
      <div className={styles.customListWrapper}>
        <div className={styles.customList}>
          {list.map((item) => {
            return (
              <div className={styles.customItem} key={item[ITEM_KEY]}>
                <div className={styles.leftItem}>
                  <div
                    spellCheck={false}
                    contentEditable
                    onInput={(e) =>
                      handleInput(item, "key", e.currentTarget.textContent)
                    }
                  >
                    {item.key}
                  </div>
                </div>
                <div className={styles.rightItem}>
                  <div
                    spellCheck={false}
                    contentEditable
                    onInput={(e) =>
                      handleInput(item, "value", e.currentTarget.textContent)
                    }
                  >
                    {item.value}
                  </div>
                  <div className={styles.closeBtn}>
                    <CloseOutlined onClick={() => handleDeleteItem(item)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const CustomActionComponent = forwardRef(LeacyCustomActionComponent);
