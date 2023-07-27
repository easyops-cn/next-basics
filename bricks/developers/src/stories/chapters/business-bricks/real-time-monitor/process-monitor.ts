import { Story } from "../../../interfaces";
import docMD from "../../../docs/real-time-monitor/process-monitor.md";
import {
  CMDB_HOST_INSTANCE_ID,
  CMDB_HOST_INSTANCE_IP
} from "../../../constants";

export const story: Story = {
  storyId: "real-time-monitor.process-monitor",
  type: "template",
  author: "lynette",
  text: {
    en: "Process Monitor",
    zh: "进程监控"
  },
  description: {
    en: "Process Monitor",
    zh: "cpu进程和内存进程趋势图"
  },
  icon: {
    lib: "antd",
    type: "number"
  },
  conf: {
    template: "real-time-monitor.process-monitor",
    params: {
      targets: [
        {
          instanceId: CMDB_HOST_INSTANCE_ID,
          ip: CMDB_HOST_INSTANCE_IP
        }
      ],
      keyword: "cmdb_service"
    }
  },
  doc: docMD
};
