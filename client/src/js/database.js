import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Post to database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  if (result[0]) {
    console.log("if side");
    const data = result[0];
    data.content = content;
    store.put(data)
  } else {
    console.log("else side");
    store.add({ jate: "jate", content:content })
  }
  console.log('data saved to database', result);
};

export const getDb = async () => {
  console.log('GET from database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.obectStore('jate');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result[0];
};

console.log("database.js is running");


initdb();