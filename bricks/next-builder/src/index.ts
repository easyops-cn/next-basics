import "./i18n";
import "./data-providers/ScanBricksAndTemplates";
import "./data-providers/GenerateBricksBasedOnModel";
import "./data-providers/GetAttrBrickConf";
import "./data-providers/GenerateTemplateProxy";
import "./custom-processors/buildStoryboard";
import "./custom-processors/getBrickConfig";
import "./custom-processors/routeTree";
import "./data-providers/BuilderGraphData";
import "./data-providers/AddStoryboardNodeAndReorder";
import "./data-providers/MoveStoryboardNodeAndReorder";
// !Lazy: import "./builder-container";
import "./data-providers/GetAllProviders";
import "./data-providers/GetBrickLibrary";
import "./data-providers/StoryboardAssembly";
import "./data-providers/ScanI18nInStoryboard";
import "./data-providers/FindReferencesOfTemplate";
import "./data-providers/ApplyStoryboardSnippetProvider";
// !Lazy: import "./search-tree";
import "./lazy-bricks";
import "./data-providers/ScanFunctionsInStoryboard";
import "./data-providers/BuildProjectOfTemplates";
import "./data-providers/getStoriesJson";
import "./events-editor";
// !Lazy: import "./event-config-form";
import "./custom-processors/getProcessedEvents";
import "./custom-processors/covertEventToFormValue";
import "./custom-processors/covertFormValueToEvent";
import "./custom-processors/covertUseResolvesToFormValue";
import "./custom-processors/covertFormValueToUseResolves";
// !Lazy: import "./function-debugger-sidebar";
// !Lazy: import "./function-debugger-toolbar";
// !Lazy: import "./function-debugger-toolbar-v2";
// !Lazy: import "./function-debugger-store";
// !Lazy: import "./function-debugger-statusbar";
import "./data-providers/RunStoryboardFunctionTests";
import "./data-providers/GetUnusedImages";
import "./data-providers/LintStoryboard";
import "./data-providers/CreateThemePage";
import "./data-providers/DeleteThemePage";
import "./data-providers/BuildProjectOfThemeTemplate";
import "./data-providers/ExperimentalExportThemeTemplate";
import "./data-providers/ApplyThemeTemplate";
import "./data-providers/ApplyThemePage";
import "./data-providers/GetProviderOfStoryboard";
import "./data-providers/GetTypeDeclarations";
import "./data-providers/GetTypeDeclarationsOfFn";
import "./custom-processors/getWorkbenchRouteTree";
import "./custom-processors/getWorkbenchDataTree";
// !Lazy: import "./workbench-action";
// !Lazy: import "./workbench-action-list";
// !Lazy: import "./workbench-sidebar";
// !Lazy: import "./workbench-pane";
// !Lazy: import "./workbench-tree";
// !Lazy: import "./workbench-store";
// !Lazy: import "./workbench-brick-tree";
// !Lazy: import "./preview-container";
// !Lazy: import "./workbench-mini-action-bar";
// !Lazy: import "./workbench-tabs";
// !Lazy: import "./workbench-context-menu";
// !Lazy: import "./workbench-quick-entry";
// !Lazy: import "./workbench-component-select";
import "./data-providers/ReplaceSingleThemePage";
import "./data-providers/PasteBricks";
import "./shared/components/contract-auto-complete";
// !Lazy: import "./workbench-brick-context-menu";
// !Lazy: import "./workbench-data-tree";
// !Lazy: import "./workbench-cache-action";
import "./data-providers/GetMatchRoute";
import "./data-providers/CreateRouteWithTheme";
// !Lazy: import "./storyboard-lint-result";
import "./custom-processors/getBrickDataFromModel";
import "./custom-processors/getSnippetDataFromModel";
import "./custom-processors/getWorkflowGraph";
import "./workflow-node";
import "./data-providers/AddDependencies";
import "./data-providers/BackupBricks";
import "./data-providers/UpgradeBricks";
// !Lazy: import "./workflow-create-data-item";
import "./custom-processors/getWorkflowPreStepData";
// !Lazy: import "./workflow-edit-data-item";
// !Lazy: import "./workflow-condition-item";
import "./data-providers/GetClassifiedBrickList";
import "./data-providers/CommitBasedStoryboardAssembly";
import "./data-providers/ProjectCommitPreCheck";
// !Lazy: import "./api-request-form-item";
// !Lazy: import "./api-proxy-request";
import "./data-providers/GetSuiteGraphBasePartCommit";
