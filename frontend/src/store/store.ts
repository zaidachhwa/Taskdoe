import { create } from "zustand";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

interface storeState {
  loading: boolean;
  isEditable: boolean;
  addTask: string;
  allTasks: [];
  editedTask: string;
  totalTodos: number;
  completedTodos: number;

  setLoading: (value: boolean) => void;
  setIsEditable: (value: boolean) => void;
  setAddTask: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAllTasks: (val: any) => void;
  setEditedTask: (val: string) => void;

  getAllTodos: () => void;
  handleDeleteTodo: (id: number) => void;
  handleStatusTodo: (id: number, status: string) => void;
  handleTodoEdit: (id: number, description: string) => void;
  handleTodoStatus: () => void;
}

const Store = create<storeState>((set) => ({
  loading: false,
  isEditable: false,
  addTask: "",
  allTasks: [],
  editedTask: "",
  totalTodos: 0,
  completedTodos: 0,

  setLoading: (state) => set({ loading: state }),
  setIsEditable: (state) => set({ isEditable: state }),
  setAddTask: (state) => set({ addTask: state }),
  setAllTasks: (state) => set({ allTasks: state }),
  setEditedTask: (state) => set({ editedTask: state }),

  getAllTodos: async () => {
    try {
      const res = await axiosInstance.get("todos");

      if (res.data) {
        set({ allTasks: res.data?.data });
      }
    } catch (error) {
      console.log(error);
    }
  },

  //   Delete a todo
  handleDeleteTodo: async (id) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.delete(`todos/delete/${id}`);

      console.log(res);
      if (res.data) {
        Store.getState().getAllTodos();
        Store.getState().handleTodoStatus();
        toast.success(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  handleStatusTodo: async (id, status) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`todos/update-status/${id}`, {
        status,
      });
      console.log(res);
      if (res.data) {
        toast.success(res.data.message);
        Store.getState().getAllTodos();
        Store.getState().handleTodoStatus();
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  handleTodoEdit: async (id, description) => {
    try {
      const res = await axiosInstance.put(`/todos/update/${id}`, {
        description,
      });

      set({ isEditable: false });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  handleTodoStatus: async () => {
    try {
      const res = await axiosInstance.get("/todos/check/stats");

      console.log(res.data);
      if (res.data) {
        set({ totalTodos: res.data.totalTodo });
        set({ completedTodos: res.data.completedTodos });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default Store;
