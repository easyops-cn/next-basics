import React, { useEffect, useState } from "react";
import {
  BrickAsComponent,
  developHelper,
  getRuntime,
} from "@next-core/brick-kit";
import { JSON_SCHEMA, safeLoad } from "js-yaml";
import {
  BrickEventsMap,
  GeneralTransform,
  BrickConf,
  UseSingleBrickConf,
} from "@next-core/brick-types";

interface MagicBrickProps {
  showType: string;
  data: any;
}

export function MagicBrick(props: MagicBrickProps): React.ReactElement {
  const [useBrickConf, setUseBrickConf] = useState<UseSingleBrickConf>();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const magicBrickConfigMap = await getRuntime().getMagicBrickConfigMapAsync();
      if (magicBrickConfigMap.has(props.showType)) {
        const data = magicBrickConfigMap.get(props.showType);
        try {
          const $$parsedProperties = data.properties
            ? safeLoad(data.properties, { schema: JSON_SCHEMA, json: true })
            : {};
          const parsedTransform = data.transform
            ? safeLoad(data.transform, { schema: JSON_SCHEMA, json: true })
            : {};
          const parsedEvents = data.events
            ? safeLoad(data.events, { schema: JSON_SCHEMA, json: true })
            : {};
          const useBrickConf: UseSingleBrickConf = {
            brick: data.brick,
            properties: $$parsedProperties as Record<string, unknown>,
            transform: parsedTransform as GeneralTransform,
            events: parsedEvents as BrickEventsMap,
          };
          await developHelper.loadDynamicBricksInBrickConf(
            useBrickConf as BrickConf
          );
          setUseBrickConf(useBrickConf);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(
            `请检查 ${props.showType} 的配置信息是否为有效的yaml数据`
          );
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(`请检查是否存在 ${props.showType} 对应的配置信息`);
      }
    }
    if (props.showType) {
      fetchData();
    }
  }, [props.showType]);

  return (
    <>
      {useBrickConf && (
        <BrickAsComponent useBrick={useBrickConf} data={props.data} />
      )}
    </>
  );
}
