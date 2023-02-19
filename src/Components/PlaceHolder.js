import React, { useState} from "react";
import styles from "./PlaceHolder.module.css";
const PlaceHolder=()=>{
    return (
    <div className={styles.container}>
        <img width={"300px"} src="/images/hackthon1.png" className={styles.picture}></img>
        <div className={styles.notice} >Enter Your Location and Find the Cheapest Hackathon</div>
    </div>
    )
     
}
export default PlaceHolder;