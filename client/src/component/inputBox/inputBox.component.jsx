import "./inputBox.css";
import React from "react";
import { useContext } from "react";
import { TasksContext } from "../../context/tasks/tasks.context";
import { useState } from "react";

const InputBoxComponent = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [task, setTask] = useState("");
  const { notes, setNotes } = useContext(TasksContext);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (task === "") return;

    const nd = new Date();
    let date = nd.toLocaleDateString();
    let year = nd.getFullYear();
    let monthIndex = new Date().getMonth();
    let month = monthNames[monthIndex];
    let completed = false;

    const currNote = {
      task,
      date,
      year,
      month,
      completed,
    };

    setNotes([...notes, currNote]);
    setTask("");
  };

  return (
    <div id="InputBox">
      <form id="InputBoxForm" onSubmit={handleSubmitForm}>
        <input
          required={true}
          id="iptBox"
          name="task"
          type="text"
          onChange={(event) => {
            setTask(event.target.value);
          }}
          value={task}
          className="form-control"
          placeholder="Please Enter Your Task"
        />

        <button className="btn btn-success" type="submit">
          Add Task{" "}
        </button>
      </form>
    </div>
  );
};

export default InputBoxComponent;
