import yaml from "js-yaml";

export function parseParameters(rawParameters: string): unknown {
  let parameters: unknown;
  try {
    if (rawParameters) {
      parameters = yaml.safeLoad(rawParameters, {
        schema: yaml.JSON_SCHEMA,
        json: true,
      });
    } else {
      parameters = [];
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return e;
  }
  return parameters;
}
