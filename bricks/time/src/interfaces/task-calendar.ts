export interface BriefData {
  date: string;
  text: string;
}

export interface TaskData {
  date: string;
  task: Record<string, any>[];
}

export interface ImportantData {
  date: string;
  issues: string[];
}

export interface ImportanceSettings {
  /**
   * 优先级
   */
  priority: string[];
  /**
   * 颜色映射关系
   */
  colorMap: Record<string, string>;
}

export interface TaskSettings {
  /**
   * 任务标题
   */
  taskTitle: string;
  /**
   * 字段映射
   */
  fields: {
    time: string;
    summary: string;
    priority: string;
  };
  /**
   * 颜色映射关系
   */
  colorMap: Record<string, string>;
}

export interface DateDetail {
  date: string;
  data: {
    brief: BriefData["text"];
    task: TaskData["task"];
    importance: ImportantData["issues"];
  };
}
