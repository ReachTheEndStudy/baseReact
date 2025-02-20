import { create } from "zustand";
import { ListType, RequestType } from "../type";

interface ListsState {
  lists: ListType[];
  requestType: RequestType;
  addListTasks: (value: string) => void;
  removeListTasks: (id: number) => void;
  fetchLists: () => void;
}

export const useListsStore = create<ListsState>((set) => ({
  lists: [],
  requestType: "Loading",
  addListTasks: (value: string) => {
    if (value) {
      const newListTasks: ListType = { id: new Date().getTime(), name: value };
      set((state) => ({
        lists: [newListTasks, ...state.lists],
        requestType: "Success",
      }));
    }
  },
  removeListTasks: (id: number) => {
    set((state) => ({ lists: state.lists.filter((list) => list.id !== id) }));
  },
  fetchLists: () => {
    set({ requestType: "Loading" });
    setTimeout(() => {
      const lists = localStorage.getItem("lists");
      if (lists) {
        const listsTransform = JSON.parse(lists);

        if (Math.random() < 0.8) {
          set({
            lists: listsTransform,
            requestType: listsTransform.length ? "Success" : "Empty",
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
