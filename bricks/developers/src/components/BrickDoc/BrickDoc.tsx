import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { K, NS_DEVELOPERS } from "../../i18n/constants";
import { SmileTwoTone } from "@ant-design/icons";
import { Button, Card, Divider, Empty } from "antd";
import style from "./BrickDoc.module.css";

export interface BrickDocProps {
  doc: string | null;
}

export function BrickDoc({ doc }: BrickDocProps): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const [rotate, setRotate] = useState(180);

  const handleCreateButtonClick = (): void => {
    if (rotate === 180) {
      setRotate(360);
    }
  };

  const empty = (
    <Empty description={<span>Customize Documentation</span>}>
      <Button type="primary" onClick={handleCreateButtonClick}>
        Create Now
        <SmileTwoTone
          className={style.rotate}
          rotate={rotate}
          twoToneColor="#52c41a"
        />
      </Button>
    </Empty>
  );

  return (
    <>
      <Card className={style.brickDocCard}>
        {doc ? (
          <div
            className={style.brickDocContainer}
            // We trust `doc` which is written by developers.
            dangerouslySetInnerHTML={{
              __html: doc,
            }}
          />
        ) : (
          empty
        )}
      </Card>
    </>
  );
}
