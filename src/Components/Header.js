import React from "react";
import styles from "./Header.module.css"
const Header=()=>{
    return (
        <div>
           <div className={styles.header}>
          
          <div className={styles.name}>HackByFlight</div>
          <div className={styles.info}>
          <div className={styles.name}>Team Member</div>
          <div>Join us</div>
          </div>     
        </div> 
        
        </div>
        
       
    )

}

export default Header;
