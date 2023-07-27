import { Chapter } from "../../../interfaces";
import { story as InstanceList } from "./instance-list";
import { story as InstanceListModal } from "./instance-list-modal";
import { story as InstanceListModalV2 } from "./instance-list-modal-v2";
import { story as InstanceDetail } from "./instance-detail";
import { story as InstanceSingleDelete } from "./instance-single-delete";
import { story as InstanceEdit } from "./instance-edit";
import { story as InstanceMultiEdit } from "./instance-multi-edit";
import { story as InstanceCreate } from "./instance-create";
import { story as InstanceBatchSetPermissions } from "./instance-batch-set-permissions";
import { story as InstanceSetPermissions } from "./instance-set-permissions";
import { story as InstanceCreateModal } from "./instance-create-modal";
import { story as InstanceTimeline } from "./instance-timeline";
import { story as InstanceChangeHistory } from "./instance-change-history";
import { story as InstanceAddRelation } from "./instance-add-relation";
import { story as InstanceName } from "./instance-name";
import { story as InstanceExportModal } from "./instance-export-modal";
import { story as InstanceRemoveRelation } from "./instance-remove-relation";
import { story as InstanceSingleDeleteBtn } from "./instance-single-delete-btn";
import { story as InstanceSingleCustomDeleteBtn } from "./instance-single-custom-delete-btn";
import { story as InstanceTimelineTemplate } from "./instance-timeline-template";
import { story as DeleteConfirm } from "./delete-confirm";
import { story as highlightTable } from "./highlight-table";
import { story as resourceChartViewer } from "./resource-chart-viewer";
import { story as UserOrUserGroupDisplay } from "./user-or-user-group-display";
import { story as CmdbInstancesExport } from "./cmdb-instances-export";
import { story as CmdbInstancesImport } from "./cmdb-instances-import";
import { Story } from "@next-core/brick-types";

export const chapter: Chapter = {
  category: "cmdb-instances",
  title: {
    en: "cmdb instances",
    zh: "CMDB实例",
  },
  stories: [
    InstanceExportModal,
    InstanceName,
    InstanceList,
    InstanceListModal,
    InstanceListModalV2,
    InstanceDetail,
    InstanceTimeline,
    InstanceChangeHistory,
    InstanceCreate,
    InstanceCreateModal,
    InstanceEdit,
    InstanceMultiEdit,
    InstanceSingleDelete,
    InstanceSetPermissions,
    InstanceBatchSetPermissions,
    InstanceAddRelation,
    InstanceRemoveRelation,
    InstanceSingleDeleteBtn,
    InstanceSingleCustomDeleteBtn,
    InstanceTimelineTemplate,
    DeleteConfirm,
    highlightTable,
    resourceChartViewer,
    UserOrUserGroupDisplay,
    CmdbInstancesExport,
    CmdbInstancesImport,
  ] as Story[],
};
