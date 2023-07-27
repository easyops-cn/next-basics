import { DeleteUnusedImages } from "./GetUnusedImages";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import {
  DocumentApi_getDocumentsDetails,
  DocumentApi_getDocumentsTreeByAppId,
} from "@next-sdk/next-builder-sdk";
import { Storyboard } from "@next-core/brick-types";

jest.mock("@next-sdk/object-store-sdk");
jest.mock("@next-sdk/cmdb-sdk");
jest.mock("@next-sdk/next-builder-sdk");

(InstanceApi_postSearch as jest.Mock).mockImplementationOnce(() => ({
  list: [
    {
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testA120211116173345.png",
      instanceId: "a",
    },
    {
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testB2120211116173350.jpeg",
      instanceId: "b",
    },
    {
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testC2120211116173400.jpeg",
      instanceId: "c",
    },
    {
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testD2120211116173410.jpg",
      instanceId: "d",
    },
    {
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testE2120211116173415.jpeg",
      instanceId: "e",
    },
    {
      url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testF2120211116173425.gif",
      instanceId: "f",
    },
  ],
}));
(DocumentApi_getDocumentsTreeByAppId as jest.Mock).mockImplementation(() => ({
  documentsTree: [
    {
      documentId: 1,
    },
    {
      documentId: 2,
    },
  ],
}));
(DocumentApi_getDocumentsDetails as jest.Mock).mockImplementation(
  (id: number) => {
    switch (id) {
      case 1:
        return {
          content:
            "### 标题一 \n [testA.png](/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testA120211116173345.png) \n [testB.jpeg](/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testB2120211116173350.jpeg)",
        };
      case 2:
        return {
          content:
            "### 标题一 \n [testC.png](/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testC2120211116173400.jpeg)[testD.png](/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testD2120211116173410.jpg)",
        };
    }
  }
);

describe("delete unused images function should work", () => {
  const appId = "test-app";
  const projectId = "abc";
  const bucketName = "next-builder";
  const storyboard = {
    app: null,
    routes: [
      {
        path: "/",
        type: "bricks",
        bricks: [
          {
            brick: "any-brick",
            properties: {
              propA:
                "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testA120211116173345.png",
              propB: {
                background:
                  'url("/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testB2120211116173350.jpeg")',
              },
              useBrick: [
                {
                  brick: "any-brick",
                  properties: {
                    propC: [
                      "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testC2120211116173400.jpeg",
                      "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testD2120211116173410.jpg",
                    ],
                  },
                },
              ],
            },
            slots: {
              content: {
                bricks: [
                  {
                    brick: "any-brick",
                    properties: {
                      propD: "www.other.com/other.png",
                      propF: "<% IMG.get('testF2120211116173425.gif') %>",
                    },
                  },
                ],
                type: "bricks",
              },
            },
          },
        ],
      },
    ],
    meta: {
      customTemplates: [
        {
          name: "a-t",
          bricks: [
            {
              brick: "b-x",
              properties: {
                propE:
                  "url('/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testE2120211116173415.jpeg')",
              },
            },
          ],
        },
      ],
    },
  } as Storyboard;

  it("should work with nothing to delete", async () => {
    const result = await DeleteUnusedImages({
      appId,
      projectId,
      storyboard,
      bucketName,
    });
    expect(result).toEqual({
      unusedImages: [],
    });
  });

  it("should work while response was nothing", async () => {
    (InstanceApi_postSearch as jest.Mock).mockImplementationOnce(() => ({
      list: [],
    }));
    const result = await DeleteUnusedImages({
      appId,
      projectId,
      storyboard,
      bucketName,
    });
    expect(result).toEqual({
      unusedImages: [],
    });
  });

  it("should work to delete", async () => {
    (InstanceApi_postSearch as jest.Mock).mockImplementationOnce(() => ({
      list: [
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testA120211116173345.png",
          instanceId: "a",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testB2120211116173350.jpeg",
          instanceId: "b",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testC2120211116173400.jpeg",
          instanceId: "c",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testD2120211116173410.jpg",
          instanceId: "d",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testE2120211116173415.jpeg",
          instanceId: "e",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testF2120211116173420.jpeg",
          instanceId: "f-delete",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testG2120211116173420.jpeg",
          instanceId: "g-delete",
        },
      ],
    }));
    const result = await DeleteUnusedImages({
      appId,
      projectId,
      storyboard,
      bucketName,
    });
    expect(result).toEqual({
      unusedImages: [
        {
          name: "testF2120211116173420.jpeg",
          instanceId: "f-delete",
        },
        {
          name: "testG2120211116173420.jpeg",
          instanceId: "g-delete",
        },
      ],
    });
  });

  it("should work to delete", async () => {
    (InstanceApi_postSearch as jest.Mock).mockImplementationOnce(() => ({
      list: [
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testA120211116173345.png",
          instanceId: "a",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testB2120211116173350.jpeg",
          instanceId: "b",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testC2120211116173400.jpeg",
          instanceId: "c",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testD2120211116173410.jpg",
          instanceId: "d",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testE2120211116173415.jpeg",
          instanceId: "e",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testF2120211116173420.jpeg",
          instanceId: "f",
        },
        {
          url: "/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/next-builder/object/testG2120211116173420.jpeg",
          instanceId: "g",
        },
      ],
    }));
    const result = await DeleteUnusedImages({
      appId,
      projectId,
      storyboard: {} as Storyboard,
      bucketName,
    });
    expect(result).toEqual({
      unusedImages: [
        { instanceId: "e", name: "testE2120211116173415.jpeg" },
        { instanceId: "f", name: "testF2120211116173420.jpeg" },
        { instanceId: "g", name: "testG2120211116173420.jpeg" },
      ],
    });
  });
});
