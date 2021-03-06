export const NS_GENERAL_AUTH = "general-auth";

export enum K {
  LOGIN_TITLE = "LOGIN_TITLE",
  PLEASE_INPUT_USERNAME = "PLEASE_INPUT_USERNAME",
  USERNAME = "USERNAME",
  PLEASE_INPUT_PASSWORD = "PLEASE_INPUT_PASSWORD",
  PASSWORD = "PASSWORD",
  REMEMBER_ME = "REMEMBER_ME",
  FORGET_PASSWORD = "FORGET_PASSWORD",
  LOGIN = "LOGIN",
  REGISTER_ACCOUNT = "REGISTER_ACCOUNT",
  LOGIN_FAILED = "LOGIN_FAILED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  PLEASE_INPUT_USERNAME_PASSWORD = "PLEASE_INPUT_USERNAME_PASSWORD",
  WX_LOGIN_TITLE = "WX_LOGIN_TITLE",
  DYNAMIC_CODE = "DYNAMIC_CODE",
  PLEASE_ENTER_DYNAMIC_CODE = "PLEASE_ENTER_DYNAMIC_CODE",
  PLEASE_COMPLETE_THE_SECURITY_VERIFICATION = "PLEASE_COMPLETE_THE_SECURITY_VERIFICATION",
  DYNAMIC_CODE_VALIDATION_FAILED = "DYNAMIC_CODE_VALIDATION_FAILED",
}

export type Locale = { [key in K]: string };
