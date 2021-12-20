import {
  Type,
  ParameterReflection,
  Reflection,
} from "typedoc/dist/lib/serialization/schema";
import { I18nData } from "@next-core/brick-types";

interface BaseFields {
  headers: Record<string, string>;
  body?: string;
}

interface RequestFields extends BaseFields {
  uri?: string;
  method?: string;
}

export interface ExampleItem {
  description?: I18nData;
  request: RequestFields;
  response: BaseFields;
}
export interface ProcessedProviderDoc {
  serviceId: string;
  brickName: string;
  comment: string;
  endpoint: string;
  parameters: ParameterReflection[];
  returns: Type;
  references: Map<string | number, Reflection>;
  usedReferenceIds: number[];
  examples: ExampleItem[];
}
