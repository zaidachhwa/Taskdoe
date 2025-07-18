import { SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";
import Store from "../store/store";

interface TaskObject {
  description: string;
  status: string;
  todo_id: number;
}

interface TaskProps {
  task: TaskObject;
}

const Task: React.FC<TaskProps> = (props) => {
  const { handleDeleteTodo, handleStatusTodo, handleTodoEdit } = Store();
  const { description, status, todo_id } = props.task;

  const [isEditable, setIsEditable] = useState(false);
  const [localEditedTask, setLocalEditedTask] = useState(description);
  return (
    <>
      <div
        className={`border text-custom-purple flex items-center bg-custom-purple/10 border-custom-purple w-full p-3 rounded-xl ${
          isEditable ? "justify-center gap-4" : "justify-between"
        }`}
      >
        <div
          onClick={() =>
            status === "Ongoing"
              ? handleStatusTodo(todo_id, "Completed")
              : handleStatusTodo(todo_id, "Ongoing")
          }
          className={`cursor-pointer size-6 rounded-full border  ${
            isEditable ? "hidden" : ""
          }
          
          ${status === "Ongoing" ? "border-custom-purple" : "bg-custom-purple"}
          
          `}
        ></div>
        <input
          type="text"
          className={`${isEditable ? "w-3/4" : "w-1/2 md:w-2/3"} ${
            status === "Ongoing" ? "" : "line-through"
          } outline-0 p-2 text-custom-purple font-semibold`}
          value={localEditedTask}
          onChange={(e) => setLocalEditedTask(e.target.value)}
          disabled={!isEditable}
        />
        <button
          type="submit"
          className={`cursor-pointer rounded-lg bg-custom-purple text-white p-2 px-3  ${
            isEditable ? "" : "hidden"
          }`}
          onClick={() => {
            handleTodoEdit(todo_id, localEditedTask);
            setIsEditable(false);
          }}
        >
          Edit
        </button>

        <SquarePen
          onClick={() => setIsEditable(true)}
          className={`cursor-pointer ${isEditable ? "hidden" : ""} 
          ${status === "Completed" ? "hidden" : ""}          
          `}
        />
        <Trash
          onClick={() => handleDeleteTodo(todo_id)}
          className={`cursor-pointer ${isEditable ? "hidden" : ""}`}
        />
      </div>
    </>
  );
};

export default Task;
