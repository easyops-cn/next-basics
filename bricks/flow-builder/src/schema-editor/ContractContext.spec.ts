import { ContractContext } from "./ContractContext";

describe("ContractContext", () => {
  it("should work", () => {
    const definitionList = [
      {
        name: "Cat",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "hobby",
            type: "Hobby",
          },
        ],
      },
      {
        name: "Hobby",
        fields: [
          {
            name: "run",
            type: "string",
          },
        ],
      },
    ];

    const importList = ["easyops.api.test.Cat"];
    const contractContext = ContractContext.getInstance(
      definitionList,
      importList
    );

    contractContext.addModelDefinition([
      {
        name: "Dog",
        fields: [
          {
            name: "age",
            type: "int",
          },
        ],
      },
    ]);

    expect(contractContext.getModelDefinition()).toEqual([
      {
        fields: [
          { name: "id", type: "string" },
          { name: "name", type: "string" },
          { name: "hobby", type: "Hobby" },
        ],
        name: "Cat",
      },
      { fields: [{ name: "run", type: "string" }], name: "Hobby" },
      {
        name: "Dog",
        fields: [
          {
            name: "age",
            type: "int",
          },
        ],
      },
    ]);

    expect(contractContext.getImportNamespaceList()).toEqual([
      "easyops.api.test.Cat",
    ]);

    contractContext.addImportNamespace(
      "TestModel",
      "easyops.api.test.TestModel"
    );

    expect(contractContext.getImportNamespaceList()).toEqual([
      "easyops.api.test.Cat",
      "easyops.api.test.TestModel",
    ]);

    expect(contractContext.hasImportNamespace("Cat")).toEqual(true);

    expect(contractContext.getSingleNamespace("TestModel")).toEqual(
      "easyops.api.test.TestModel"
    );

    expect(ContractContext.getInstance()).toEqual(contractContext);

    ContractContext.cleanInstance();
    expect(ContractContext.instance).not.toBeTruthy();
  });
});
