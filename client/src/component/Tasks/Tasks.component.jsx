import "./Tasks.css";

import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InputBoxComponent from "../inputBox/inputBox.component";
import { TasksContext } from "../../context/tasks/tasks.context";
import TaskComponent from "../Task/Task.component";
import SeachBoxComponent from "../SearchBox/SeachBox.component";

const TasksComponent = () => {
  const { notes, setNotes, displayNotes, setDisplayNotes } =
    useContext(TasksContext);

  const deleteHandler = (index) => {
    const newNotes = notes.filter((currNote, idx) => idx !== index);
    setNotes(newNotes);
  };

  const checkHandler = (index) => {
    const newNotes = notes.map((currNote, idx) =>
      idx === index ? { ...currNote, completed: !currNote.completed } : currNote
    );
    setNotes(newNotes);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/v1/tasks", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((json) => {
        // console.log("from fetch API", json[0].tasks);
        setNotes(json[0].tasks);
      });
  }, []);

  useEffect(() => {
    setDisplayNotes(notes);
  }, [notes]);

  const dragStartIdx = useRef(null);
  const dragEndIdx = useRef(null);
  const swap = (arr, start, end) => {
    const newArray = [...arr];
    newArray.splice(end, 0, newArray.splice(start, 1)[0]);
    return newArray;
  };

  return (
    <div className="TasksFragmentConatainer">
      <div>
        <InputBoxComponent style={{ marginTop: "10vh" }} />
      </div>
      <div>
        <SeachBoxComponent />
      </div>
      <div className="Tasks">
        <div className="tasksDisplay">
          {!displayNotes || displayNotes.length === 0 ? (
            <div> No Notes To Display </div>
          ) : (
            displayNotes.map((currentNote, index) => {
              return (
                <div
                  draggable
                  key={index}
                  onDragStart={(e) => {
                    // console.log("Drag start index: " , index)
                    dragStartIdx.current = index;
                  }}
                  onDragEnter={(e) => {
                    // console.log("Drag Enter Index: " , index)
                    dragEndIdx.current = index;
                  }}
                  onDragEnd={(e) => {
                    // console.log("Drag End: ", dragStartIdx, "->", dragEndIdx);
                    const newArray = swap(
                      displayNotes,
                      dragStartIdx.current,
                      dragEndIdx.current
                    );
                    // console.log("From Swap: ",newArray)
                    setNotes(newArray);
                    if (newArray.length === notes.length) {
                      setNotes(newArray);
                    } 
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <TaskComponent
                    key={index}
                    note={currentNote}
                    index={index}
                    deleteHandler={deleteHandler}
                    checkHandler={checkHandler}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksComponent;
