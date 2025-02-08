import { Endpoints } from '@octokit/types';

const ACCESS = window.indexedDB.open('test');

function createDB(name: string, version: number = 1) {
  const openDBConnection = window.indexedDB.open(name, version);

  openDBConnection.onupgradeneeded = (event) => {
    const db = event?.target?.result as IDBIndex;

    // Create another object store called "names" with the autoIncrement flag set as true.
    const objStore = db.createObjectStore("names", { autoIncrement: true });

    // Because the "names" object store has the key generator, the key for the name value is generated automatically.
    // The added records would be like:
    // key : 1 => value : "Bill"
    // key : 2 => value : "Donna"
    customerData.forEach((customer) => {
      objStore.add(customer.name);
    });
  };
}


export default function test(): Endpoints['GET /issues']['response'] {
  return {} as any;
}
