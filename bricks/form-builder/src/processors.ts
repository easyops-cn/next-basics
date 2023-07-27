// istanbul ignore file
import { CmdbObjectApi_getObjectAll } from "@next-sdk/cmdb-sdk";
import { JsonStorage } from "@next-libs/storage";

const DB_NAME = "form_builder_db"; // 数据库名称
const DB_MODEL_NAME = "object_all"; // 表名称
const lastLoginTime = "LAST_LOGIN_TIME";

const identifyEffective = (newEffective: string, oldEffective: string) => {
  return String(newEffective) === String(oldEffective);
};

// 读取、写入
const getDataSourceAndInertDB = async (
  db: any,
  resolve: any,
  loginTime: string
) => {
  const dataSource = (await CmdbObjectApi_getObjectAll({})).data;
  resolve(dataSource);
  db.transaction([DB_MODEL_NAME], "readwrite")
    .objectStore(DB_MODEL_NAME)
    .add({ id: 1, dataSource: dataSource, effective: loginTime });
};

export const getObjectAllByIndexDB = async () => {
  let db: any; // 保存db实例
  const storage = new JsonStorage(localStorage);
  const loginTime = storage.getItem(lastLoginTime) ?? "0";
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME); // 打开数据库
    // 数据库打开错误，直接对外抛出错误
    request.onerror = async (e) => {
      reject(e);
    };

    // 创建表必须在onupgradeneeded里执行；
    // 第一次打开数据库时，会先触发upgradeneeded事件，然后触发success事件。
    request.onupgradeneeded = function (event: any) {
      db = event.target.result;
      let objectStore;
      if (!db.objectStoreNames.contains(DB_MODEL_NAME)) {
        objectStore = db.createObjectStore(DB_MODEL_NAME, { keyPath: "id" });
      }
      objectStore.createIndex("dataSource", "dataSource", { unique: true });
      objectStore.createIndex("effective", "effective", { unique: true });
    };

    // 打开数据库成功
    request.onsuccess = () => {
      db = request.result;
      // 获取数据
      const transaction = db.transaction([DB_MODEL_NAME]);
      const objectStore = transaction.objectStore(DB_MODEL_NAME);
      const read = objectStore.get(1);

      // 读取数据失败
      read.onerror = (e: any) => {
        reject(e);
      };

      // 读取数据成功
      read.onsuccess = async () => {
        if (read.result) {
          // 数据读取成功，判断是否是合法数据，如果是则返回，如果不是则请求后台，并重新写入返回
          // 请求、写入、返回
          const { effective, dataSource } = read.result;
          // 判断是否为有效数据
          if (identifyEffective(effective, loginTime)) {
            resolve(dataSource);
          } else {
            // 数据失效，重新请求
            const deleteDB = db
              .transaction([DB_MODEL_NAME], "readwrite")
              .objectStore(DB_MODEL_NAME)
              .delete(1);

            deleteDB.onsuccess = function () {
              getDataSourceAndInertDB(db, resolve, loginTime);
            };
            deleteDB.onerror = function (e: any) {
              reject(e);
            };
          }
        } else {
          getDataSourceAndInertDB(db, resolve, loginTime);
        }
      };
    };
  });
};
