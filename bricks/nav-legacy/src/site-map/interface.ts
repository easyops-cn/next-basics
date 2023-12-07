export interface INavState {
  // 显示的名称
  text?: string;
  // 菜单项唯一 ID，命名规范为“小写羊肉串”。
  // 应确保在 `NavModuleList` 中唯一，将用于记录“钉在顶部”
  // 没有链接则不需设置
  id?: string;
  // 显示的图标（可选，但填写与否应在一个 NavModule 中保持一致）
  icon?: string;
  // 所属特性点
  feature?: string;
  // 所属菜单组
  group?: INavGroup;

  // 菜单链接，stateName/sref/href/src 有且仅有一项
  // 目标 ui-router state name（不含 params）
  stateName?: string;
  // 完整的 `ui-sref`
  sref?: string;
  // 外链链接
  href?: string;
  // 外链打开方式
  target?: string;
  // 作为 iframe 内嵌进来的目标 url
  src?: string;
  // 强制刷新 state 与ui-router reload一致
  reload?: string | boolean;
  inherit?: boolean;

  // 目标 ui-router state params
  stateParams?: any;
  // 该菜单项 `active` 状态应包含的 state(s)
  // 默认为上面配置的 stateName
  stateIncludes?: string | string[] | FnStateIncludes;
  // 该菜单项 `active` 状态应包含的 state params
  // 若指定为 `true` 则使用 `this.stateParams`
  stateIncludesParams?: boolean | any;
  // 该菜单项`active` 状态不应包含的 state(s)
  stateNotIncludes?: string | string[];

  autoCollapsed?: boolean;

  // 是否即将弃用
  deprecated?: boolean;
}

export type NavModuleList = INavModule[];

// 顶级模块也可以定义菜单链接
export interface INavModule extends INavState {
  groups?: INavGroup[];
  hidden?: boolean;
  // 在顶部下拉菜单中最多排几列
  cols?: number;
}

export interface IHeaderNav extends INavModule {
  open?: boolean;
  frequentStates?: INavState[];
}

export interface INavGroup {
  states?: INavState[];
  category?: string;
  // 所属特性点
  feature?: string;
  hidden?: boolean;
  // 所属菜单模块
  module?: INavModule;
}

export interface INavStateTree extends INavState {
  states: INavStateTree[];
}

export type FnStateIncludes = ($state: any) => boolean;

// `INav*Patch` 用于 navs.json 配置
export interface INavModulePatch extends INavState {
  groups?: INavGroupPatch[];
  // 如果一个菜单不需要分组，可以忽略 groups 直接写 states
  states?: INavStatePatch[];
  hidden?: boolean;
}

export interface INavGroupPatch extends INavGroup {
  states?: INavStatePatch[];
}

export interface INavStatePatch extends INavState {
  // 如果根据 `id` 找到了原状态，则覆盖原状态
  // 否则，使用 `after` 或 `before` 将一个菜单项添加到已有菜单的指定位置
  // 可以指定为已有菜单的 `id` 或 `text`
  // 这两项都不填写时，追加到末尾
  after?: string;
  before?: string;
}
