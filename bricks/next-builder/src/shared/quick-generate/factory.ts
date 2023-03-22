import { keys } from "lodash";
import { getSingleInstance } from "./CommTypeGenerator";
import { FormTypeGenerator } from "./FormTypeGenerator";

import { TableTypeGenerator } from "./TableTypeGenerator";

import { SupportedBrick } from "./interface";

const brickGeneratorMap: Record<SupportedBrick, any> = {
  "forms.general-form": getSingleInstance(FormTypeGenerator),
  "presentational-bricks.brick-table": getSingleInstance(TableTypeGenerator),
};

export function generatorFactory(type: SupportedBrick, ...args: any[]): any {
  if (!keys(brickGeneratorMap).includes(type)) {
    throw new Error(
      `This brick: ${type} is not currently support quick generation`
    );
  }
  return brickGeneratorMap[type](...args);
}
