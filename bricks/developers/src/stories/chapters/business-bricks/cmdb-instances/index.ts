import { Chapter } from "../../../interfaces";
import { story as InstanceList } from "./instance-list";
import { story as InstanceListModal } from "./instance-list-modal";
import { story as InstanceListModalV2 } from "./instance-list-modal-v2";
import { story as InstanceListCard } from "./instance-card-list";
import { story as InstanceDetail } from "./instance-detail";
import { story as InstanceSingleDelete } from "./instance-single-delete";
import { story as InstanceMultipleDelete } from "./instance-multi-delete";
import { story as InstanceEdit } from "./instance-edit";
import { story as InstanceMultiEdit } from "./instance-multi-edit";
import { story as InstanceCreate } from "./instance-create";
import { story as InstanceBatchSetPermissions } from "./instance-batch-set-permissions";
import { story as InstanceSetPermissions } from "./instance-set-permissions";
import { story as InstanceVersionList } from "./instance-version-list";
import { story as InstanceCreateModal } from "./instance-create-modal";
import { story as InstanceTimeline } from "./instance-timeline";
import { story as InstanceChangeHistory } from "./instance-change-history";
import { story as InstanceAddRelation } from "./instance-add-relation";
import { story as InstanceMultiCreate } from "./instance-multi-create";
import { story as InstanceName } from "./instance-name";
import { story as InstanceExportModal } from "./instance-export-modal";
import { story as InstanceRemoveRelation } from "./instance-remove-relation";
import { story as InstanceRemoveRelationWrapper } from "./instance-remove-relation-wrapper";
import { story as InstanceSingleDeleteBtn } from "./instance-single-delete-btn";
import { story as InstanceSingleCustomDeleteBtn } from "./instance-single-custom-delete-btn";
import { story as InstanceTimelineTemplate } from "./instance-timeline-template";
import { story as InstanceChangeHistoryTemplate } from "./instance-change-history-template";
import { story as InstanceRelationManagementTemplate } from "./instance-relation-management-template";
import { story as AppClusterList } from "./app-cluster-list";
import { story as multipleInstanceDeleteTemplate } from "./multiple-instance-delete-template";
import { story as DeleteConfirm } from "./delete-confirm";
import { story as instanceTreeTemplate } from "./instance-tree-template";
import { story as highlightTable } from "./highlight-table";
import { story as resourceChartViewer } from "./resource-chart-viewer";
import { story as relationPathTree } from "./relation-path-tree";
import { story as instanceGroupChart } from "./instance-group-chart";
import { story as UserOrUserGroupDisplay } from "./user-or-user-group-display";

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
    InstanceListCard,
    InstanceDetail,
    InstanceTimeline,
    InstanceChangeHistory,
    InstanceVersionList,
    InstanceCreate,
    InstanceCreateModal,
    InstanceMultiCreate,
    InstanceEdit,
    InstanceMultiEdit,
    InstanceSingleDelete,
    InstanceMultipleDelete,
    InstanceSetPermissions,
    InstanceBatchSetPermissions,
    InstanceAddRelation,
    InstanceRemoveRelation,
    InstanceRemoveRelationWrapper,
    InstanceSingleDeleteBtn,
    InstanceSingleCustomDeleteBtn,
    InstanceTimelineTemplate,
    InstanceChangeHistoryTemplate,
    InstanceRelationManagementTemplate,
    AppClusterList,
    multipleInstanceDeleteTemplate,
    DeleteConfirm,
    instanceTreeTemplate,
    highlightTable,
    resourceChartViewer,
    relationPathTree,
    instanceGroupChart,
    UserOrUserGroupDisplay,
  ],
};
