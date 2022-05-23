import { getRuntime } from "@next-core/brick-kit";
import _, { isEmpty } from "lodash";
import { ContractData, ExtField } from "./interfaces";

const simpleMethodList = ["DELETE", "GET", "HEAD", "LIST"];

export function processExtFields(ext_fields: ExtField[], args: any[]): any {
  const hasFields = (type: "query" | "body"): boolean => {
    return ext_fields.some((item) => item.source === type);
  };

  const hasQueryParams = hasFields("query");
  const HasBodyParams = hasFields("body");

  if (hasQueryParams && HasBodyParams) {
    const [data, params] = args;
    return {
      data,
      params,
    };
  }

  if (hasQueryParams) {
    const [params] = args;
    return {
      params,
    };
  }

  // only hasBodyParams or default
  const [data] = args;
  return {
    data,
  };
}

function appendParamsWithUri(uri: string, params = {}): string {
  if (!isEmpty(params)) {
    let formatUri = uri + "?";
    Object.entries(params).forEach(([key, value], index) => {
      formatUri += `${index !== 0 ? "&" : ""}${key}=${value}`;
    });
    return formatUri;
  }

  return uri;
}

export function getParamsOfDebug(
  contract: ContractData,
  args: any[] = []
): any {
  const { uri, method, ext_fields: extFields } = contract.endpoint;
  const originalArgs = args.slice();

  const transformedUri = uri.replace(
    /:([^/]+)/g,
    () => originalArgs.shift() as string
  );

  if (simpleMethodList.includes(method)) {
    const queryParams = originalArgs.shift();
    const processedUri = appendParamsWithUri(transformedUri, queryParams);

    return {
      uri: processedUri,
      method: method === "LIST" ? "GET" : method,
    };
  }

  if (!isEmpty(extFields)) {
    const result = processExtFields(extFields, originalArgs);
    const processedUri = appendParamsWithUri(transformedUri, result.params);

    return {
      uri: processedUri,
      method: method,
      data: result.data,
    };
  } else {
    const [data] = originalArgs;
    return {
      uri: transformedUri,
      method: method,
      data,
    };
  }
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getParamsOfDebug",
  getParamsOfDebug
);
