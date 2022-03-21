import { StorageKey } from "../../static";

export class StorageHelper {
  static get(key: StorageKey, parse = true): any | null {
    if (key === undefined) { return null }
    const val = localStorage.getItem(key);
    if (!val) { return null }
    return parse ? this.parse(val) : val;
  }

  static set(key: StorageKey, val: Object | string, stringify = true): void | null {
    if (key === undefined || val === undefined) { return null }
    let strObj: string = '';
    if (stringify && typeof val === 'object') { strObj = JSON.stringify(val) }
    if (typeof val === 'string') { strObj = val };
    if (strObj !== '') {
      localStorage.setItem(key, strObj);
    } else {
      console.error(`Type of key: ${key} is unknow, please provide a valid object`);
      return;
    }
  }

  static updateInArray(key: StorageKey, item: any, id?: number | string): null | void {
    if (key === undefined || item === undefined) { return null }
    if (item.id === undefined && id === undefined) { return null }
    const itemTargetId = item.id !== undefined ? item.id : id;
    const arr: any[] = this.get(key);
    if (arr === null || arr.length < 1) { return null; }
    const targetIndex = arr.findIndex((x) => {
      if (x.id === undefined) { return false; }
      return x.id === itemTargetId;
    });
    arr[targetIndex] = item;
    this.set(key, arr);
    return;
  }

  static addItemInArray(key: StorageKey, item: any): boolean {
    if (key === undefined || item === undefined) { return false }
    const arr: any[] = this.get(key);
    if (arr === null || arr.length < 1) {
      this.set(key, [item]);
      return true;
    }
    arr.push(item);
    this.set(key, arr);
    return true;
  }

  static removeItemFromArray(key: StorageKey, id: number | string): boolean {
    if (key === undefined || id === undefined) { return false;}
    const arr = this.get(key);
    if (arr === null || arr.length < 1) { return false; }
    const targetIdx = arr.findIndex((x: any) => x.id !== undefined ? false : x.id === id);
    arr.splice(targetIdx, 1);
    this.set(key, arr);
    return true;
  }

  static remove(key: StorageKey): void {
    return localStorage.removeItem(key);
  }

  private static parse<T>(str: string): T | null {
    return JSON.parse(str);
  }
}
