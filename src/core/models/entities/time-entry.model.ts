import { ITimeEntryTag } from ".";
import { IBase } from "./base.model";

export interface ITimeEntryPrimitive {
  title: string;
  start: Date;
  end?: Date;
}

export interface ITimeEntryFinished extends ITimeEntry {
  end: Date;
}

export interface ITimeEntryConstrains {
  isEditable: boolean;
}

export interface ITimeEntry extends ITimeEntryPrimitive, ITimeEntryConstrains, IBase {
  description?: string;
  tags?: ITimeEntryTag[];
}
