import { ITimeEntryTag } from ".";
import { IUser } from ".";
import { IBase } from "./base.model";

export interface ITimeEntryPrimitive {
  title: string;
  start: Date;
  end?: Date;
}

export interface ITimeEntry extends ITimeEntryPrimitive, IBase {
  description?: string;
  tags?: ITimeEntryTag[];
}
