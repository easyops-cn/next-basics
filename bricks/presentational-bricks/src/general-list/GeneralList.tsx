import React from "react";
import classNames from "classnames";

interface GeneralListProps {
  isCardList: boolean;
  cardWidth?: string;
  cardMinWidth?: string;
}

export function GeneralList(props: GeneralListProps): React.ReactElement {
  return (
    <div
      className={classNames("listContainer", {
        cardListContainer: props.isCardList
      })}
      style={
        props.cardMinWidth
          ? {
              gridTemplateColumns: `repeat(auto-fill,minmax(${props.cardMinWidth}, 1fr))`
            }
          : props.cardWidth
          ? {
              gridTemplateColumns: `repeat(auto-fill,${props.cardWidth})`
            }
          : {}
      }
    >
      <slot id="itemsSlot" name="items" />
    </div>
  );
}
