import React, { useMemo } from "react";

interface EasyViewProps {
  gridAreas?: Record<string, (string | number)[]>;
  gridTemplateAreas?: string[][];
  gridTemplateColumns?: string | string[];
  gridTemplateRows?: string | string[];
  containerStyle?: React.CSSProperties;
  styleByAreas?: Record<string, React.CSSProperties>;
}

export function EasyView({
  gridAreas,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  containerStyle,
  styleByAreas,
}: EasyViewProps): React.ReactElement {
  const areas = useMemo(
    () =>
      gridAreas
        ? Object.keys(gridAreas)
        : Array.from(new Set(gridTemplateAreas?.flat?.() ?? [])).filter(
            (area) => area !== "."
          ),
    [gridAreas, gridTemplateAreas]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: gridTemplateAreas
          ?.map((row) => `"${row.join(" ")}"`)
          .join(" "),
        gridTemplateColumns: Array.isArray(gridTemplateColumns)
          ? gridTemplateColumns.join(" ")
          : gridTemplateColumns,
        gridTemplateRows: Array.isArray(gridTemplateRows)
          ? gridTemplateRows.join(" ")
          : gridTemplateRows,
        ...containerStyle,
      }}
    >
      {areas.map((area) => (
        <div
          key={area}
          style={{
            gridArea: gridAreas ? gridAreas[area].join(" / ") : area,
            ...styleByAreas?.[area],
          }}
        >
          <slot name={area} />
        </div>
      ))}
    </div>
  );
}
