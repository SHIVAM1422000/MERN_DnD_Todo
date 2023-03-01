import { createContext, useState } from "react";

const EditTask = async (obj) => {
  const rawResponse = await fetch(
    "http://127.0.0.1:5001/api/v1/tasks/63fe1079cbebfae26f059d57",
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  );
  const content = await rawResponse.json();

  // console.log(content);
};

export const TasksContext = createContext({
  notes: [],
  setNotes: () => null,
  displayNotes: [],
  setDisplayNotes: () => null,
});

export const TasksContextProvider = ({ children }) => {
  const [notes, setNts] = useState([]);
  const [displayNotes, setDspNotes] = useState([]);

  const setNotes = (newNote) => {
    const obj = {
      tasks: newNote,
    };
    // console.log("New Notes:", obj);
    EditTask(obj);
    setNts(newNote);
  };

  const setDisplayNotes = (newNotes) => {
    setDspNotes(newNotes);
  };

  const value = { notes, setNotes, displayNotes , setDisplayNotes}
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
