import { StorageHelper } from "../../classes/storage/storage.helper.class";
import { ITimeEntry } from "../../models/api";
import { StorageKey } from "../../static/storage-key.enums";

export class TimeEntryLocalService {
  create() {
    const entry: Partial<ITimeEntry> = {id: Math.random() + '', description: '' };
    return StorageHelper.addItemInArray(StorageKey.LocalTimeEntries, entry);
  }

  updateEntry(entry: ITimeEntry) {
    return StorageHelper.updateInArray(StorageKey.LocalTimeEntries, entry);
  }

  getEntries(): ITimeEntry[] {
    const entries = StorageHelper.get(StorageKey.LocalTimeEntries);
    if (entries === null) { return []; }
    return entries;
  }
}
