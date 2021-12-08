import { ITimeEntryTag } from ".";
import { IUser } from ".";

export interface ITimeEntryPrimitive {
  title: string;
  start: Date;
  end?: Date;
}

export interface ITimeEntryBareBones extends ITimeEntryPrimitive {
  id: number;
}

export interface ITimeEntry extends ITimeEntryBareBones {
  description?: string;
  taskId?: number;
  owner: IUser;
  tags?: ITimeEntryTag[];
}
