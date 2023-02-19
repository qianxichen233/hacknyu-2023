import React,{useState} from 'react';
import styles from './Search.module.css'
const Search =()=>{
    const [hackData, setHackData] = useState([]);

  return (
    <ul className={styles.result}>
        <li className={styles.item}>
            
                <img className={styles.logo} src="/images/img1.jpeg" alt="logo"></img>
                
                <div className={styles.content}> 
                <div className={styles.info}>
                 <div className={styles.title}>
                 CrimsonCode Hackathon
                 </div>
                 <div className={styles.time}>
                  FEB 18TH - 19TH
                 </div>
                 <div className={styles.location}>Pullman, Washington</div>
                 <div className={styles.pattern}>In-Person Only</div>
                 <div>

                 </div>
                </div>
                <div className={styles.price}>
                    <div className={styles.priceNumber}>80$</div>
                    <div className={styles.round}>Round Trip</div>
                </div>
                </div>
            
        </li>
    </ul>
  )
}
export default Search;