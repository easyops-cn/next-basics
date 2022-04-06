import React, { CSSProperties, useMemo, useState } from "react";
import { Card, message, Tag, Tooltip } from "antd";
import { getIllustration, IllustrationProps } from "@next-core/illustrations";
import styles from "./index.module.css";
import { PresetColorTypes } from "antd/lib/_util/colors";
import { Clipboard } from "@next-libs/clipboard";
import { useCurrentTheme } from "@next-core/brick-kit";

interface IllustrationCardProps extends IllustrationProps {
  style?: CSSProperties;
  title?: string;
  description?: string;
  color: string;
}

export function IllustrationCard({
  name,
  category,
  style,
  title,
  color,
}: IllustrationCardProps): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const theme = useCurrentTheme();
  const image = useMemo(() => {
    const src = getIllustration({ name, category, theme });

    return (
      <>
        <img
          src={src}
          className={styles.imgCss}
          onLoad={() => setLoading(false)}
        />
      </>
    );
  }, [name, category, theme]);

  const handleCopy = (text: string) => {
    message.success(`\`${text}\` copied 🎉`);
  };

  const renderTag = <Tag color={color}>{category}</Tag>;
  return (
    <Clipboard
      text={`${JSON.stringify({ name, category })}`}
      onCopy={handleCopy}
    >
      <Card
        cover={image}
        hoverable
        style={style}
        loading={loading}
        className={styles.illustrationCard}
      >
        <Card.Meta title={name} description={renderTag} />
      </Card>
    </Clipboard>
  );
}

interface IllustrationCardListProps {
  illustrations: { name: string; category: string; color: string }[];
}
export function IllustrationCardList({
  illustrations,
}: IllustrationCardListProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: "6px",
        gridTemplateColumns: "repeat(6, minmax(0px, 1fr))",
      }}
    >
      {illustrations?.map((v, index) => {
        return (
          <IllustrationCard
            key={v.category}
            name={v.name}
            category={v.category}
            color={v.color}
          />
        );
      })}
    </div>
  );
}
