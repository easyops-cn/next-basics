export const NS_GENERAL_AUTH = "general-auth";

export enum K {
  LOGIN_TITLE = "LOGIN_TITLE",
  PLEASE_INPUT_USERNAME = "PLEASE_INPUT_USERNAME",
  USERNAME = "USERNAME",
  NICKNAME = "NICKNAME",
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
  LDAP_ACCOUNT = "LDAP_ACCOUNT",
  LDAP_LOGIN_TITLE = "LDAP_LOGIN_TITLE",
  CUSTOM_LOGIN_TITLE = "CUSTOM_LOGIN_TITLE",
  CLICK_TO_GET_SECURITY_CODE = "CLICK_TO_GET_SECURITY_CODE",
  SECURITY_CODE = "SECURITY_CODE",
  PLEASE_INPUT_USERNAME_PASSWORD_PHRASE = "PLEASE_INPUT_USERNAME_PASSWORD_PHRASE",
  PLEASE_INPUT_PHRASE = "PLEASE_INPUT_PHRASE",
  PLEASE_INPUT_USERNAME_PHRASE = "PLEASE_INPUT_USERNAME_PHRASE",
  PLEASE_INPUT_PASSWORD_PHRASE = "PLEASE_INPUT_PASSWORD_PHRASE",
  REGISTER = "REGISTER",
  ALREADY_HAVE_AN_ACCOUNT = "ALREADY_HAVE_AN_ACCOUNT",
  LOGIN_IMMEDIATELY = "LOGIN_IMMEDIATELY",
  AGREE_TERMS = "AGREE_TERMS",
  UWINTECH_TERMS = "UWINTECH_TERMS",
  AGREE_TERMS_TIPS = "AGREE_TERMS_TIPS",
  JOIN_THE_ORGANIZATION = "JOIN_THE_ORGANIZATION",
  REGISTER_COMMONLY = "REGISTER_COMMONLY",
  REGISTER_AND_JOIN = "REGISTER_AND_JOIN",
  USERNAME_TIPS = "USERNAME_TIPS",
  PLEASE_ENTER_VALID_EMAIL = "PLEASE_ENTER_VALID_EMAIL",
  GET_VERIFY_CODE = "GET_VERIFY_CODE",
  PLEASE_FILL_IN_VALID_PHONE_NUMBER = "PLEASE_FILL_IN_VALID_PHONE_NUMBER",
  PLEASE_FILL_IN_INVITE_CODE = "PLEASE_FILL_IN_INVITE_CODE",
  TWO_PASSWORDS_ARE_INCONSISTENT = "TWO_PASSWORDS_ARE_INCONSISTENT",
  EMAIL = "EMAIL",
  PASSWORD_CONFIRM = "PASSWORD_CONFIRM",
  PHONE = "PHONE",
  VERIFY_CODE = "VERIFY_CODE",
  INVITE_CODE = "INVITE_CODE",
  GET_VERIFY_CODE_TIPS = "GET_VERIFY_CODE_TIPS",
  AGREE = "AGREE",
  DISAGREE = "DISAGREE",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILED = "REGISTER_FAILED",
  PLEASE_CONFIRM_PASSWORD = "PLEASE_CONFIRM_PASSWORD",
  PLEASE_INPUT_VALID_PHRASE = "PLEASE_INPUT_VALID_PHRASE",
  WRONG_VERIFICATION_CODE = "WRONG_VERIFICATION_CODE",
  WRONG_INVITE_CODE = "WRONG_INVITE_CODE",
  LOCAL_LOGIN = "LOCAL_LOGIN",
  UNIFIED_IDENTITY_AUTH = "UNIFIED_IDENTITY_AUTH",
}

export type Locale = { [key in K]: string };
