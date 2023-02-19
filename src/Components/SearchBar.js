import React, { useState, useRef } from "react";
import styles from "./SearchBar.module.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  return <div className={styles.container}>
    <div className={styles.conditionInput1}>
    <label htmlFor="location" className={styles.label}>Location</label>
    <input id="location" type="date" className={styles.datePick1} value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
    </div>
    <div className={styles.conditionInput2}>
    <label htmlFor="stateDate" className={styles.label}>Start Date</label>
    <input id="startDate" type="date" className={styles.datePick2} value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
    </div>
    <div className={styles.conditionInput3}>
        <div style={{width: "80%"}}>
            <label htmlFor="endDate" className={styles.label}>End Date</label>
            <input id="endDate" type="date" className={styles.datePick3} value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
        </div>
    </div>
  </div>
}

export default SearchBar;
