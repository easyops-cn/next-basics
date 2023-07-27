import React from "react";
import { useTranslation } from "react-i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { isEmpty } from "lodash";
import styles from "./BannerDisplayCardList.module.css";

export interface CardItem {
  title?: string;
  content?: string;
  optionConf?: { useBrick: UseBrickConf };
  green?: boolean;
}

interface BannerDisplayCardListProps {
  cardList: CardItem[];
}

export function BannerDisplayCardList({
  cardList = [],
}: BannerDisplayCardListProps): React.ReactElement {
  const { t } = useTranslation(NS_PRESENTATIONAL_BRICKS);

  return (
    <div className={styles.cardWrapper} data-testid="card-wrapper">
      {cardList.map((card: CardItem, index) => (
        <div className={styles.cardContent} key={card.title}>
          <h5>
            {card.title}
            <div
              className={styles.cardIcon}
              style={card.green ? { background: "#20B759" } : {}}
            >
              {index + 1}
            </div>
          </h5>
          <section>{card.content}</section>
          {!isEmpty(card.optionConf?.useBrick) && (
            <BrickAsComponent
              useBrick={card.optionConf?.useBrick}
              data={card}
            ></BrickAsComponent>
          )}
        </div>
      ))}
    </div>
  );
}
