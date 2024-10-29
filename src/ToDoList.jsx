import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState("");

  const addTask = () => {
    //toast.success("Added Task Successfully!");
    if (newTasks.trim() === "") {
      toast.error("ERROR OCCURED!");
    }

    if (newTasks.trim() !== "") {
      toast.success("Added Successfully !", {
        position: toast.POSITION_TOP_LEFT,
      });
      const newTaskData = {
        id: Date.now(),
        text: newTasks,
        completed: false,
        favorite: false,
        isEditing: false,
      };

      setTasks((prevTask) => [newTaskData, ...prevTask]);
      setNewTasks("");
    }
  };

  const deleteTask = (taskId) => {
    toast.success("Deleted Task Successfully!");

    setTasks((prevTask) => {
      const updatedTasks = prevTask.filter((tasks) => tasks.id !== taskId);
      //tasks[] is getting changed to updatedTasks
      return updatedTasks;
    });
  };

  // Edit --> selected task from list and newtask
  const handleEditTask = (taskId, newText) => {
    console.log("toggle edit task");

    toast.success("Updated Successfully!");
    setTasks((prevTask) =>
      prevTask.map((tasks) =>
        tasks.id === taskId
          ? { ...tasks, text: newText, isEditing: false }
          : tasks
      )
    );
  };

  // save & edit button
  const handleToggleEditing = (taskId) => {
    console.log("toggle edit button");
    setTasks((prevTask) =>
      prevTask.map((tasks) =>
        //if isEditing is true --> false and isEditing is false --> true
        tasks.id === taskId ? { ...tasks, isEditing: !tasks.isEditing } : tasks
      )
    );
  };

  const handleKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      handleEditTask(taskId, e.target.value);
    }
  };
  const toggleFavorite = (taskId) => {
    console.log("Added to favorites");
    setTasks((prevTask) =>
      prevTask.map((tasks) =>
        tasks.id === taskId ? { ...tasks, favorite: !tasks.favorite } : tasks
      )
    );
  };
  const markCompleted = (taskId) => {
    console.log("Task completed");
    setTasks((prevTask) =>
      prevTask.map((tasks) =>
        tasks.id === taskId ? { ...tasks, completed: !tasks.completed } : tasks
      )
    );
  };

  const renderTasks = () => {
    const completedTasks = tasks.filter((tasks) => tasks.completed);
    const uncompletedTasks = tasks.filter((tasks) => !tasks.completed);

    //* rendering the list based on the task completed or not

    return [...uncompletedTasks, ...completedTasks].map((tasks) => (
      <ul class="list-group justify-content-center">
        <li key={tasks.id} class="d-flex list-group-item ">
          <input
            class="p2 me-2 mr-auto"
            type="checkbox"
            onClick={() => markCompleted(tasks.id)}
          />

          {tasks.isEditing ? (
            //* in Editing mode
            <div class="mr-auto p-2 flex-grow-1">
              <input
                class="me-5"
                value={tasks.text}
                onChange={(e) =>
                  setTasks((prevTask) =>
                    prevTask.map((t) =>
                      t.id === tasks.id ? { ...t, text: e.target.value } : t
                    )
                  )
                }
                onKeyPress={(e) => handleKeyPress(e, tasks.id)}
              />
            </div>
          ) : (
            //* outside editing mode
            <div class="p-2 ">
              <div
                class="me-5 p-2 flex-grow-1"
                className={tasks.isEditing ? "contentEditable" : ""}
                contentEditable={tasks.isEditing}
                onBlur={(e) => handleEditTask(tasks.id, e.target.textContent)}
              >
                {tasks.text}
              </div>
            </div>
          )}
          {tasks.isEditing ? (
            <div class="p-2">
              <button
                class="btn btn-secondary me-1"
                onClick={() => handleEditTask(tasks.id, tasks.text)}
              >
                <i class="bi bi-floppy2"></i>
              </button>
            </div>
          ) : (
            <div class="p-2 d-flex ">
              <button
                class="btn btn-secondary me-1 ml-auto"
                onClick={() => toggleFavorite(tasks.id)}
              >
                {tasks.favorite ? (
                  <i class="bi bi-star-fill"></i>
                ) : (
                  <i class="bi bi-star"></i>
                )}
              </button>
              <button
                class="btn btn-secondary me-1"
                onClick={() => deleteTask(tasks.id)}
              >
                <i class="bi bi-trash3-fill"></i>
              </button>
              <button
                class="btn btn-secondary me-1"
                onClick={() => handleToggleEditing(tasks.id)}
              >
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>
          )}
        </li>
      </ul>
    ));
  };

  console.log(tasks);
  return (
    <div>
      <ToastContainer />
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          aria-describedby="button-addon2"
          placeholder="Add New Task"
          value={newTasks}
          onChange={(e) => setNewTasks(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? addTask() : null)}
        />
        <div class="input-group-append ">
          <button
            id="button-addon2"
            class="btn btn-outline-secondary"
            type="button"
            onClick={addTask}
          >
            Add Task +
          </button>
        </div>
      </div>
      {renderTasks()}
    </div>
  );
}

export default TodoList;
