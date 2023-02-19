import React, { useState } from "react";
import styles from "./Search.module.css";

import Modal from "./UI/Modal";
import DetailCart from "./UI/Cart/DetailCart";
import PlaceHolder from "./PlaceHolder";

import { Location, Date, Price, Link } from "./UI/Icons";

const dummyData = {
    hackathon_info: {
        name: "Hacknyu",
        imageURL:
            "https://s3.amazonaws.com/assets.mlh.io/events/logos/000/212/477/thumb/brickhack100x100.png?1674064309",
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

        Carriers: "plane",
        Duration: "123",
    },
};

const Search = ({ hackData }) => {
    const [onHover, setOnHover] = useState(false);

    return (
        <>
            <ul className={styles.result} onClick={setOnHover.bind(null, true)}>
                <li className={styles.item}>
                    <img
                        className={styles.logo}
                        src={hackData.hackathon_info.imageURL}
                        alt="logo"
                    ></img>

                    <div className={styles.content}>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                {hackData.hackathon_info.name}
                            </div>
                            <div className={styles.time}>
                                {hackData.hackathon_info.date.value}
                            </div>
                            <div className={styles.location}>
                                {hackData.hackathon_info.location.value}
                            </div>
                            <div className={styles.pattern}>In-Person Only</div>
                            <div></div>
                        </div>
                        <div className={styles.price}>
                            <div className={styles.priceNumber}>
                                {hackData.flight_info.price.value}
                            </div>
                            <div className={styles.round}>One-Way</div>
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
                    hackathon_info={hackData.hackathon_info}
                    flight_info={hackData.flight_info}
                />
            </Modal>
        </>
    );
};
export default Search;
