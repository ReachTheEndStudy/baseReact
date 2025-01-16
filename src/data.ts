export interface ListType {
  id: number;
  name: string;
}

export const listsData: ListType[] = [
  { id: 1, name: 'Развитие', },
  { id: 2, name: 'Спорт', }
]

export interface TaskType {
  id: number;
  name: string
  isDone: boolean
}

export interface TasksDataType {
  [key: number]: TaskType[]
}

export const tasksData: TasksDataType = {
  1: [{ id: 1, name: "уроки", isDone: true }, { id: 2, name: "занятия", isDone: true }, { id: 3, name: "домашка", isDone: false }],
  2: [{ id: 1, name: "бицепс", isDone: false }, { id: 2, name: "бег", isDone: false }, { id: 3, name: "плавание", isDone: false }]
}