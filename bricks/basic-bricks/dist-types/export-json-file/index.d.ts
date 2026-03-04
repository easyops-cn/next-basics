export interface ExportJsonFileProps {
  fileName?: string;
  data?: any;
}

export interface ExportJsonFileEvents {
  "json-file.export.success": CustomEvent<void>;
  "json-file.export.failed": CustomEvent<void>;
}

export interface ExportJsonFileEventsMap {
  onJsonFileExportSuccess: "json-file.export.success";
  onJsonFileExportFailed: "json-file.export.failed";
}

export declare class ExportJsonFileElement extends HTMLElement {
  fileName: string | undefined;
  data: any | undefined;
  export(event: CustomEvent): void;
}
