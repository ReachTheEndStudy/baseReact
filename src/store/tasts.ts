import { create } from "zustand";
import { TaskType } from "../type";

const emptyTask = { id: -1, name: "", isDone: false };

interface TasksState {
  tasks: TaskType[];
  editableTask: TaskType;
  addTasks: (value: string) => void;
  editTask: (task: TaskType, isEdit: boolean) => void;
  setEditableTask: (task: TaskType) => void;
  removeTask: (id: number) => void;
  changeIsDoneTask: (id: number) => void;
  setTasks: (tasks: TaskType[]) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  editableTask: emptyTask,
  addTasks: (value: string) => {
    if (value) {
      set((state) => ({
        tasks: [
          { id: new Date().getTime(), name: value, isDone: false },
          ...state.tasks,
        ],
      }));
    }
  },
  editTask: (task: TaskType, isEdit: boolean) => {
    if (isEdit) {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === state.editableTask.id ? state.editableTask : task
        ),
        editableTask: emptyTask,
      }));
    } else {
      set({ editableTask: task });
    }
  },
  setEditableTask: (task: TaskType) => {
    set({ editableTask: task });
  },
  removeTask: (id: number) => {
    set((state) => ({ tasks: state.tasks.filter((tasks) => tasks.id !== id) }));
  },
  changeIsDoneTask: (id: number) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      ),
    }));
  },
  setTasks: (tasks: TaskType[]) => {
    set({ tasks });
  },
}));
