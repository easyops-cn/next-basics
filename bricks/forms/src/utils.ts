import { flatMap, isNil, isString, last, uniqBy } from "lodash";

export class Base64 {
  static encode(value: string): string {
    if (isNil(value)) return "";
    const uint8array = new TextEncoder().encode(value);
    const str = String.fromCharCode.apply(null, Array.from(uint8array));
    return btoa(str);
  }

  static decode(x: string): string {
    const str = atob(x);
    const uint8array = new Uint8Array(
      str.split("").map((_, i) => str.charCodeAt(i))
    );
    const raw = new TextDecoder().decode(uint8array);
    return raw;
  }
}

export const encrypt = (value: string): string => Base64.encode(value);
export const decrypt = (x: string): string => Base64.decode(x);

export enum FileSizeUnit {
  KB,
  MB,
  GB,
}

interface fileItem {
  name?: string;
  uid?: string;
  size?: number;
  type?: string;
  [propName: string]: any;
}
export class FileUtils {
  /**
   * @description 比较文件大小
   * @param {fileItem | fileItem[]} file 文件或文件列表
   * @param {number} size 对比大小
   * @param {FileSizeUnit} unit 对比大小单位
   * @return - true : 文件大小 > size
   *         - false: 文件大小 < size
   */
  static sizeCompare(
    file: fileItem | fileItem[],
    size: number,
    unit: FileSizeUnit = FileSizeUnit.MB
  ): boolean {
    const sizeConst = {
      [FileSizeUnit.KB]: 1024,
      [FileSizeUnit.MB]: 1024 * 1024,
      [FileSizeUnit.GB]: 1024 * 1024 * 1024,
    };
    let totalFileSize: number;
    if (Array.isArray(file)) {
      totalFileSize = file.reduce((a, b) => a + b.size, 0);
    } else {
      totalFileSize = file.size;
    }
    const compareSize = size * sizeConst[unit];
    if (totalFileSize < compareSize) return false;
    return true;
  }
}

interface treeItem {
  title: string;
  value: string;
  isLeaf?: boolean;
  parentId?: string;
  key?: string;
  id?: string;
  children?: treeItem[];
}

// 根据扁平数组对象生成树形数组中的节点对象
export function nodeData(obj: treeItem) {
  return {
    ...obj,
    children: (obj.isLeaf ? null : []) as any,
  };
}

// 通过ID，递归查找树形结构中的元素
export const getElementById: any = (arr: treeItem[], parentId: string) => {
  for (const ele of arr) {
    if (ele.id === parentId) {
      return ele;
    } else if (ele.children?.length > 0) {
      const temp = getElementById(ele.children, parentId);
      if (temp) {
        return temp;
      }
    }
  }
};
export function allRegexToTree(data: treeItem[]) {
  // tree来保存树形数组
  const tree: any[] = [];

  if (!Array.isArray(data)) {
    return tree;
  }

  data.forEach((ele) => {
    if (ele.parentId === "" || isNil(ele.parentId))
      return tree.push(nodeData(ele));
    // 在树形数组上查找父级节点对象
    const obj = getElementById(tree, ele.parentId);
    // 如果存在，添加到这个节点的children属性中
    obj && obj.children.push(nodeData(ele));
  });

  return tree;
}

export const treeEnumFormat = (value: string | string[]) => {
  const regex: any[] = [];
  const results = isString(value) ? value?.split("\n") : value;
  results.forEach((item, index) => {
    // 有子节点的项不能作为枚举项
    const isLeaf = !results?.find((h, i) => h?.match(item) && i !== index);
    if (isLeaf) {
      const itemArray = item?.split("/");
      regex.push(
        itemArray?.map((s, i) => {
          const parentString = itemArray?.slice(0, i)?.join("/");
          return {
            title: s,
            value: `${parentString ? parentString + "/" : ""}${s}`,
            isLeaf: i === itemArray?.length - 1,
            parentId: `${parentString}`,
            id: `${parentString ? parentString + "/" : ""}${s}`,
          };
        })
      );
    }
  });
  const allRegex = uniqBy(flatMap(regex), "id");
  return allRegexToTree(allRegex);
};
