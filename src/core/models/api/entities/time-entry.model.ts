import { ITimeEntryTag } from ".";
import { IUser } from ".";

export interface ITimeEntryPrimitive {
  title: string;
  start: Date;
  end?: Date;
}

export interface ITimeEntry extends ITimeEntryPrimitive {
  id: number;
  taskId?: number;
  description?: string;
  asignee?: IUser;
  tags?: ITimeEntryTag[];
}
