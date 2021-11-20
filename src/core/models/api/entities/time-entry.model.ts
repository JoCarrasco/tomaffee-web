import { ITimeEntryTag } from ".";
import { IUser } from ".";

export interface ITimeEntryPrimitive {
  description: string | null;
  start: Date;
  end?: Date;
}

export interface ITimeEntry extends ITimeEntryPrimitive {
  id: number;
  taskId?: number;
  asignee?: IUser;
  tags?: ITimeEntryTag[] | null;
}
