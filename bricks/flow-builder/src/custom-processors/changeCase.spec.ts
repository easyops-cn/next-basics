import { changeCaseUtils } from "./changeCase";

jest.mock("@next-core/brick-kit", () => ({
  getRuntime: () => ({
    registerCustomProcessor: jest.fn(),
  }),
}));

describe("changeCase", () => {
  it.each([
    [
      "paramCase",
      "GetSQLPackageDBTaskObjects",
      "get-sql-package-db-task-objects",
    ],
    [
      "snakeCase",
      "GetSQLPackageDBTaskObjects",
      "get_sql_package_db_task_objects",
    ],
  ])("should work", (type, name, result) => {
    expect(changeCaseUtils(type, name)).toEqual(result);
  });
});
