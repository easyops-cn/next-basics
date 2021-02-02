import {
  Type,
  ParameterReflection,
  Reflection,
} from "typedoc/dist/lib/serialization/schema";

export interface ProcessedProviderDoc {
  serviceId: string;
  brickName: string;
  comment: string;
  endpoint: string;
  parameters: ParameterReflection[];
  returns: Type;
  references: Map<string | number, Reflection>;
  usedReferenceIds: number[];
}
