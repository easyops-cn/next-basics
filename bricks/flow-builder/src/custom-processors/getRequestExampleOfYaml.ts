import { getRuntime } from "@next-core/brick-kit";
import { safeDump, JSON_SCHEMA } from "js-yaml";
import { Example, ContractData } from "./interfaces";
import { compact } from "lodash";

export function getRequestExampleOfYaml(
  contractData: ContractData,
  curExample: Example
): any {
  const result: any = {};
  const uri = contractData.endpoint.uri;

  const uriRegex = new RegExp(uri.replace(/\/:\w+/g, "/(\\w+)"));

  const path = curExample.request.uri;

  const uriMatch = path.match(uriRegex);

  if (uriMatch) {
    result.uriParams = uriMatch.slice(1);
  } else {
    result.uriParams = [];
  }

  const queryMatch = path.match(/\w+\?(.*)$/);

  if (queryMatch) {
    const [, q] = queryMatch;
    result.queryParams = {};
    q.split("&")?.forEach((item: any) => {
      const [key, value] = item.split("=");
      result.queryParams[key] = value;
    });
  }

  try {
    // istanbul ignore else
    if (curExample.request.body) {
      const body = JSON.parse(curExample.request.body);
      result.data = body;
    }
  } catch (error) {
    // istanbul ignore next
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const args = compact([...result.uriParams, result.data, result.queryParams]);

  return safeDump(args, {
    indent: 2,
    schema: JSON_SCHEMA,
    skipInvalid: true,
    noRefs: true,
    noCompatMode: true,
  });
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getRequestExampleOfYaml",
  getRequestExampleOfYaml
);
