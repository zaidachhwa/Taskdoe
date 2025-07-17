import { Github } from "lucide-react";
import React, { useEffect } from "react";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";
import Task from "../components/Task";
import Store from "../store/store";

const Home: React.FC = () => {
  const {
    addTask,
    allTasks,
    isEditable,
    loading,
    setAddTask,
    setIsEditable,
    setLoading,
    getAllTodos,
    totalTodos,
    completedTodos,
    handleTodoStatus,
  } = Store();

  const handleAddTasks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/todos/create", {
        description: addTask,
      });

      console.log(res);

      if (res.data) {
        toast.success(res.data.message);
        getAllTodos();
        handleTodoStatus();
        setAddTask("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const err: string = error.response.data.message;
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTodos();
    handleTodoStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full h-full bg-custom-bg p-3">
        {/* Nav */}
        <div className="w-full mx-auto md:w-9/12 flex items-center justify-between p-3 text-custom-purple">
          <div className="logo flex font-semibold text-3xl">
            Loop <div className="text">ly</div>
          </div>
          <div className="border-2 rounded-full p-1 flex items-center justify-center">
            <Github />
          </div>
        </div>

        {/* Todo's Stats */}

        <div className="w-full mx-auto md:w-7/12 lg:w-6/12 p-3 mt-10 border-2 rounded-xl shadow-lg border-custom-purple flex items-center justify-around">
          <h3 className="text-custom-purple font-semibold text-xl">
            Tasks Done
          </h3>
          <div className="bg-custom-purple size-32 rounded-full flex items-center justify-center">
            <div className="flex items-center justify-center gap-2 text-white font-semibold text-xl">
              <p className="">{completedTodos}</p> <p className="">/</p>{" "}
              <p className="">{totalTodos}</p>
            </div>
          </div>
        </div>

        {/* Input for adding Todos */}

        <form
          onSubmit={handleAddTasks}
          className="w-full mx-auto md:w-7/12 lg:w-6/12 mt-14 p-3 flex items-center gap-5 justify-center"
        >
          <input
            type="text"
            className="outline-0 text-custom-purple w-10/12 border border-custom-purple p-2 
            rounded-lg pl-4 lg:p-3 lg:pl-6"
            required
            value={addTask}
            onChange={(e) => setAddTask(e.target.value)}
            placeholder="Enter Tasks"
          />
          <button
            type="submit"
            className={`
                 font-semibold text-white p-2 px-3 lg:p-3 md:px-6 lg:px-8 rounded-lg
                ${
                  loading
                    ? "cursor-not-allowed bg-custom-purple/80 pointer-events-none"
                    : "cursor-pointer bg-custom-purple"
                }
                `}
          >
            Add
          </button>
        </form>

        {/* List all tasks */}

        <div className="w-full mx-auto md:w-7/12 lg:w-6/12 mt-10 p-3 flex flex-col items-center gap-5 justify-center">
          {allTasks.length !== 0 ? (
            allTasks.map((task: object) => {
              return (
                <Task
                  key={task.todo_id}
                  task={task}
                  isEditable={isEditable}
                  setIsEditable={setIsEditable}
                />
              );
            })
          ) : (
            <h3 className="font-semibold text-custom-purple">
              Looks like you've completed all tasks! Time to add more.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
