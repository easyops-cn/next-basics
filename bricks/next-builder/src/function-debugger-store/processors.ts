import { SerializableValue } from "./reducers/interfaces";

export function processSerializableValue(input: string): SerializableValue {
  let ok = false;
  let error: string;
  try {
    generalizedJsonParse(input);
    ok = true;
  } catch (e) {
    error = String(e);
  }
  return {
    raw: input,
    ok,
    error,
  };
}

export function generalizedJsonParse<T = unknown>(input: string): T {
  return input === "undefined" ? undefined : JSON.parse(input);
}

export function formatSerializableValue<T extends SerializableValue>(
  serializable: T
): T {
  return {
    ...serializable,
    // Re-parse input to avoid mutating after tests run.
    raw: JSON.stringify(JSON.parse(serializable.raw), null, 2),
  };
}
