export interface AvatarUploadProps {
  imgSrc?: string;
  size?: number;
  modalOkText?: string;
  textStyle?: Record<string, any>;
}

export interface AvatarUploadEvents {
  "avatar.upload.success": CustomEvent<any>;
}

export interface AvatarUploadEventsMap {
  onAvatarUploadSuccess: "avatar.upload.success";
}

export declare class AvatarUploadElement extends HTMLElement {
  imgSrc: string | undefined;
  size: number | undefined;
  modalOkText: string | undefined;
  textStyle: Record<string, any> | undefined;
}
