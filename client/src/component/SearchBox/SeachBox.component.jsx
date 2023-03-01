import React, {useContext, useState} from "react";
import "./SearchBox.styles.css";
import { DateRangePicker } from 'react-date-range';
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { TasksContext } from '../../context/tasks/tasks.context';



const SeachBoxComponent = () => {

    const {notes,setDisplayNotes, displayNotes} = useContext(TasksContext)

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
  
      const handleSelect = (date) => {
        let sD=new Date(date.selection.startDate)
        sD=sD.toLocaleDateString()
        let eD=new Date(date.selection.endDate)
        eD=eD.toLocaleDateString()
        // console.log(sD," -- " , eD)
        // console.log("Filter Function Running")
        const filterdNotes=notes.filter(note => (sD<=note.date && note.date<=eD ))
        // console.log(filterdNotes)
        setDisplayNotes(filterdNotes)
        
      }

      const [keywordMonth, setKeywordMonth] = useState("");
      const handleChange = (event) => {
          setKeywordMonth(event.target.value)
      }
  
      const handleOnSubmitMonth = (e) => {
          e.preventDefault();
        // console.log("Checking for keyword:" , keywordMonth)
          const filteredArray=notes.filter((note)=>(note.month.toLowerCase().includes(keywordMonth.toLowerCase())))  
          setDisplayNotes(filteredArray)
          setKeywordMonth("")
      }

  return (
    <div className="SearchBox">
          <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
        <form onSubmit={handleOnSubmitMonth}>
        <input id="searchBox" value={keywordMonth} type="text" className="form-control" placeholder="Search By Keyword Like: Month / Task" onChange={handleChange} />
        </form>
    </div>
  );
};

export default SeachBoxComponent;
{
  /* <SearchByDateComponent/> */
}
