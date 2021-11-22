import { ITimeEntryTag } from ".";
import { IUser } from ".";

export interface ITimeEntryPrimitive {
  title: string;
  start: Date;
  end?: Date;
}

export interface ITimeEntryBareBones extends ITimeEntryPrimitive {
  id: number;
  description?: string;
}

export interface ITimeEntry extends ITimeEntryBareBones {
  taskId?: number;
  owner: IUser;
  tags?: ITimeEntryTag[];
}
