import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { BrickAsComponent } from "@next-core/brick-kit";
import { List } from "antd";
import { UseBrickConf } from "@next-core/brick-types";
import style from "./style.module.css";
import VirtualList from "rc-virtual-list";
import { uniqBy } from "lodash";

export interface VirtualListContainerProps {
  data: Record<string, any>[];
  titleBrick: { useBrick: UseBrickConf };
  suffixBrick?: { useBrick: UseBrickConf };
  oHeight: string;
  onScrollData?: any;
  total?: number;
}
export function VirtualListContainer(
  props: VirtualListContainerProps,
  ref: any
): React.ReactElement {
  const [height, setHeight] = useState(500);
  const [data, setData] = useState<any[]>([]);
  const domRef = useRef() as React.RefObject<any>;

  // istanbul ignore next
  useImperativeHandle(ref, () => ({
    refreshDomHeight() {
      setHeight(domRef?.current?.clientHeight ?? 500);
    },
  }));

  /* istanbul ignore next */
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (data.length >= props.total) {
      return;
    }
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === height) {
      props.onScrollData && props.onScrollData();
    }
  };

  useEffect(() => {
    if (props.data?.length) {
      setData(uniqBy([...props.data], "uniqId"));
    }
  }, [props.data]);

  return (
    <div
      className="virtualListContainer"
      ref={domRef}
      style={{ height: props.oHeight }}
    >
      <List>
        <VirtualList
          data={data}
          height={height}
          itemKey="instanceId"
          onScroll={onScroll}
        >
          {(item: any) => (
            <List.Item key={item.instanceId}>
              <div className={style.itemContainer}>
                <div className={style.itemContainerInner}>
                  <div className={style.itemIcon}>
                    {props.titleBrick?.useBrick && (
                      <BrickAsComponent
                        useBrick={props.titleBrick.useBrick}
                        data={item}
                      ></BrickAsComponent>
                    )}
                  </div>
                  <div className={style.itemContent}>
                    {item.header && (
                      <div className={style.itemContentHeader}>
                        {item.header}
                      </div>
                    )}
                    {item.title && (
                      <div className={style.itemContentTitle}>{item.title}</div>
                    )}
                    {item.desc && (
                      <div className={style.itemContentDesc}>{item.desc}</div>
                    )}
                  </div>
                </div>
                <div className={style.itemFooter}>
                  {props?.suffixBrick?.useBrick && (
                    <BrickAsComponent
                      useBrick={props.suffixBrick.useBrick}
                      data={item}
                    ></BrickAsComponent>
                  )}
                </div>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
}

export const VirtualListContainer2 = forwardRef(VirtualListContainer);
