export interface DeleteConfirmModalProps {
  eventName?: string;
  message?: string;
  title?: string;
  data?: any;
}

export declare class DeleteConfirmModalElement extends HTMLElement {
  eventName: string | undefined;
  message: string | undefined;
  title: string;
  data: any | undefined;
}
