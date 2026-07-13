const DB_NAME = 'OpSyncDB';
const STORE_NAME = 'operationLog';

let db = null; // 数据库实例，初始化后保存

/**
 * 打开数据库（如果不存在会自动创建）
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1); // 版本号 1
    // 数据库首次创建或版本升级时触发
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true, // 主键自增
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    request.onerror = (event) => reject(event.target.error);
  });
}

/**
 * 写入一条日志
 * @param {Object} log - 日志对象（不需要传 id，DB 自动生成）
 * @returns {Promise<number>} 自动生成的日志 id
 */
function addLog(log) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(log);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * 查询所有 id > sinceId 的日志（按时间排序）
 * @param {number} sinceId
 * @returns {Promise<Array>}
 */
function getLogsAfter(sinceId) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME], 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const logs = [];
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.value.id > sinceId) {
          logs.push(cursor.value);
        }
        cursor.continue();
      } else {
        logs.sort((a, b) => a.timestamp - b.timestamp);
        resolve(logs);
      }
    };
    request.onerror = () => reject(request.error);
  });
}