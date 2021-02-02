import { Chapter } from "../../interfaces";
import { chapter as CMDBObjectChapter } from "./cmdb-object";
import { chapter as CMDBInstancesChapter } from "./cmdb-instances";
import { chapter as CMDBChartsChapter } from "./cmdb-charts";
import { chapter as CMDBTopologyChapter } from "./cmdb-topology";
import { chapter as CIChapter } from "./ci";
import { chapter as AutoCollectionChapter } from "./auto-collection";
import { chapter as FlowAndToolChapter } from "./tool-and-flow";
import { chapter as RealTimeMonitor } from "./real-time-monitor";
import { chapter as opsAutomationChapter } from "./ops-automation";
import { chapter as DeployChapter } from "./deploy";
import { chapter as LogChapter } from "./monitor-log";
import { chapter as AgileChapter } from "./agile";
import { chapter as PermissionChapter } from "./permission";

export const businessBook: Chapter[] = [
  CMDBObjectChapter,
  CMDBInstancesChapter,
  CMDBChartsChapter,
  CMDBTopologyChapter,
  CIChapter,
  AutoCollectionChapter,
  FlowAndToolChapter,
  RealTimeMonitor,
  opsAutomationChapter,
  DeployChapter,
  LogChapter,
  AgileChapter,
  PermissionChapter,
];
