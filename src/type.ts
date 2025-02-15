export interface ListType {
  id: number;
  name: string;
}

export interface TaskType {
  id: number;
  name: string
  isDone: boolean
}

export interface TasksDataType {
  [key: number]: TaskType[]
}

export type RequestType = "Loading" | 'Error' | 'Success' | 'Empty'
