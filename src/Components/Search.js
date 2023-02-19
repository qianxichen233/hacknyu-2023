import React, { useState } from "react";
import styles from "./Search.module.css";

import Modal from "./UI/Modal";
import DetailCart from "./UI/Cart/DetailCart";
import PlaceHolder from "./PlaceHolder";

import { Location, Date, Price, Link } from "./UI/Icons";

const dummyData = {
  hackathon_info: {
    name: "Hacknyu",
    location: {
      value: "NYU Tandon",
      Icon: Location,
    },
    date: {
      value: "Feb 18-19",
      Icon: Date,
    },
    url: {
      value: {
        url: "https://hacknyu.org/",
        text: "Go To Website",
      },
      Icon: Link,
    },
  },
  flight_info: {
    source: {
      value: "Tirane, AlbaniaS",
      code: "ITA",
      Icon: Location,
    },
    destination: {
      value: "NYC",
      code: "MUC",
      Icon: Location,
    },
    price: {
      value: "10.99$",
      Icon: Price,
    },

    operator: "Jetblue Airways",
    flightID: "JT22554D",
  },
};

const Search = () => {
  const [hackData, setHackData] = useState([]);

  const [onHover, setOnHover] = useState(false);

  return (
    
    <div>
      {!hackData.length ? (
        <PlaceHolder />
      ) : (
        <div>
          <ul className={styles.result} onClick={setOnHover.bind(null, true)}>
            <li className={styles.item}>
              <img
                className={styles.logo}
                src="/images/img1.jpeg"
                alt="logo"
              ></img>

              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.title}>CrimsonCode Hackathon</div>
                  <div className={styles.time}>FEB 18TH - 19TH</div>
                  <div className={styles.location}>Pullman, Washington</div>
                  <div className={styles.pattern}>In-Person Only</div>
                  <div></div>
                </div>
                <div className={styles.price}>
                  <div className={styles.priceNumber}>$80</div>
                  <div className={styles.round}>Round Trip</div>
                </div>
              </div>
            </li>
          </ul>
          <Modal
            active={onHover}
            center={true}
            color="transparent"
            deactive={setOnHover.bind(null, false)}
          >
            <DetailCart
              hackathon_info={dummyData.hackathon_info}
              flight_info={dummyData.flight_info}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
export default Search;
