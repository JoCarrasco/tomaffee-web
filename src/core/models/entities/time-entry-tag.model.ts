import { IBase } from "./base.model";

export interface ITimeEntryTag extends IBase {
  description: string;
  color?: string;
}
