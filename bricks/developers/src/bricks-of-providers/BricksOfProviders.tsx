import React from "react";
import { Card, List } from "antd";
import { Link } from "@next-libs/basic-components";

export interface ServiceData {
  id: string;
  bricks: string[];
}

interface BricksOfProvidersProps {
  serviceData: ServiceData;
}

export function BricksOfProviders(
  props: BricksOfProvidersProps
): React.ReactElement {
  if (!props.serviceData) {
    return null;
  }

  return (
    <Card title={props.serviceData.id} bordered={false}>
      <List
        dataSource={props.serviceData.bricks}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  to={`/developers/providers/${props.serviceData.id}/${
                    item.split(".")[1]
                  }`}
                >
                  {item}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
