import {
  CustomerApi_validateEmail,
  CustomerApi_validateUser,
} from "@next-sdk/air-admin-service-sdk";

export const validateMap: Record<string, any> = {
  airEmailValidator: debounceValidate(airEmailValidValidator),
  airNameValidator: debounceValidate(airNameValidValidator),
};

export function debounceValidate(validateFn: (...args: any[]) => void) {
  let timer: NodeJS.Timeout;

  return (
    value: any,
    callback: (value?: string) => void,
    forceUpdate: (value: any) => void
  ) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(async () => {
      await validateFn( value, callback, forceUpdate);
    }, 500);
  };
}

export async function airEmailValidValidator(
  value: string,
  callback: (value?: string) => void,
  forceUpdate: (value: any) => void
) {
  if (!value) {
    callback();
  } else {
    try {
      const result = await CustomerApi_validateEmail(
        { email: value },
        {
          interceptorParams: { ignoreLoadingBar: true },
        }
      );
      if (result.validateInfo === "OK") {
        callback();
      } else if (result.validateInfo === "duplicated_email") {
        callback("该邮箱已经被注册");
      }
    } catch (error) {
      callback(error);
    }
  }
  forceUpdate({});
}

export async function airNameValidValidator(
  value: string,
  callback: (value?: string) => void,
  forceUpdate: (value: any) => void
) {
  if (!value) {
    callback();
  } else {
    try {
      const result = await CustomerApi_validateUser(
        { userId: value },
        {
          interceptorParams: { ignoreLoadingBar: true },
        }
      );
      if (result.validateInfo === "OK") {
        callback();
      } else if (result.validateInfo === "duplicated_user") {
        callback("已存在该用户名");
      }
    } catch (error) {
      callback(error);
    }
  }

  forceUpdate({});
}
