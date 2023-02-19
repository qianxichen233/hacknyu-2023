import React, { useState, useRef } from "react";
import styles from "./SearchBar.module.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import LocationSearchBar from "./LocationSearchBar";

const SearchBar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const searchData=()=>{

  }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.container}>
          <div className={styles.conditionInput1}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <div className={styles.datePick1}>
              <LocationSearchBar />
            </div>
          </div>
          <div className={styles.conditionInput2}>
            <label htmlFor="stateDate" className={styles.label}>
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              className={styles.datePick2}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className={styles.conditionInput3}>
            <div style={{ width: "80%" }}>
              <label htmlFor="endDate" className={styles.label}>
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                className={styles.datePick3}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className={styles.button} onClick={searchData}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
