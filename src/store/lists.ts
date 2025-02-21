import { create } from "zustand";
import { ListType, RequestType } from "../type";

interface ListsStateType {
  listsTask: ListType[];
  requestType: RequestType;
  addListTasks: (value: string) => void;
  removeListTasks: (id: number) => void;
  fetchLists: () => void;
}

export const useListsStore = create<ListsStateType>((set) => ({
  listsTask: [],
  requestType: "Loading",
  addListTasks: (value: string) => {
    if (value) {
      const newListTasks: ListType = { id: new Date().getTime(), name: value };
      set((state) => ({
        requestType: "Success",
        listsTask: [newListTasks, ...state.listsTask],
      }));
    }
  },
  removeListTasks: (id: number) => {
    set((state) => ({
      listsTask: state.listsTask.filter((list) => list.id !== id),
    }));
  },
  fetchLists: () => {
    set({ requestType: "Loading" });
    setTimeout(() => {
      const lists = localStorage.getItem("lists");
      if (lists) {
        const listsTransform = JSON.parse(lists);

        if (Math.random() < 0.8) {
          set({
            requestType: listsTransform.length ? "Success" : "Empty",
            listsTask: listsTransform,
          });
        } else {
          set({ requestType: "Error" });
        }
      } else {
        set({ requestType: Math.random() < 0.1 ? "Error" : "Empty" });
      }
    }, 2000);
  },
}));
