import React from "react";
import { List, Avatar } from "antd";
import { ListProps, ListItemProps, ListItemMetaProps } from "antd/lib/List";
import { ItemBrick } from "./index";
import classNames from "classnames";
import styles from "./index.module.css";

export interface MetaProps extends ListItemMetaProps {
  src: string;
  title: string;
  description: string;
}

export interface ItemProps extends ListItemProps {
  meta: MetaProps;
  content: string;
}

export interface BrickListProps {
  configProps?: ListProps<any>;
  itemList: ItemProps[];
  itemBrick?: ItemBrick;
  itemStyle?: any;
  isCardList?: boolean;
}

export function BrickList(props: BrickListProps): React.ReactElement {
  const { configProps, itemList = [], isCardList } = props;

  return (
    <List
      split={!isCardList}
      {...configProps}
      dataSource={itemList}
      className={classNames({
        [styles.cardList]: isCardList
      })}
      renderItem={item => {
        const { meta, content, ...originItemProps } = item;
        return (
          <>
            {props.itemBrick ? (
              <List.Item style={props.itemStyle}>
                <props.itemBrick.brick
                  ref={(el: any) => {
                    el &&
                      Object.assign(el, {
                        dataSource: item,
                        ...props.itemBrick.properties
                      });
                  }}
                />
              </List.Item>
            ) : (
              <List.Item {...originItemProps} style={props.itemStyle}>
                {meta && (
                  <List.Item.Meta
                    {...(item.meta.src && {
                      avatar: <Avatar src={item.meta.src} />
                    })}
                    title={item.meta.title}
                    description={item.meta.description}
                  />
                )}
                <div>{content}</div>
              </List.Item>
            )}
          </>
        );
      }}
    />
  );
}
