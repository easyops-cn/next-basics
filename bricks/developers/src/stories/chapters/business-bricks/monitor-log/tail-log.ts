import { Story } from "../../../interfaces";
import docMD from "../../../docs/monitor-log/tail-log.md";
import {
  CMDB_HOST_INSTANCE_ID,
  CMDB_HOST_INSTANCE_IP
} from "../../../constants";

export const story: Story = {
  storyId: "monitor-log.tail-log",
  type: "template",
  author: "lynette",
  text: {
    en: "Tail log",
    zh: "查看日志"
  },
  description: {
    en: "Tail log",
    zh: "查看指定机器指定目录下的日志"
  },
  icon: {
    lib: "antd",
    type: "number"
  },
  conf: {
    template: "monitor-log.tail-log",
    params: {
      targets: [
        {
          instanceId: CMDB_HOST_INSTANCE_ID,
          ip: CMDB_HOST_INSTANCE_IP
        }
      ],
      filePath: "/var/log/messages"
    }
  },
  doc: docMD
};
