import { useState } from "react";
import classes from "./FlightCart.module.css";

import Modal from "../Modal";
import DetailCart from "./DetailCart";

import { Location, Date, Price, Link } from "../Icons";

const dummyData = {
    hackathon_info: {
        Name: "Hacknyu",
        Location: {
            value: "NYU Tandon",
            Icon: Location,
        },
        Date: {
            value: "Feb 18-19",
            Icon: Date,
        },
        URL: {
            value: {
                url: "https://hacknyu.org/",
                text: "Go To Website",
            },
            Icon: Link,
        },
    },
    flight_info: {
        Source: {
            value: "US",
            Icon: Location,
        },
        Destination: {
            value: "NYC",
            Icon: Location,
        },
        price: {
            value: "10.99$",
            Icon: Price,
        },
    },
};

const FlightCart = (props) => {
    const [onHover, setOnHover] = useState(false);

    return (
        <>
            <div
                onClick={setOnHover.bind(null, true)}
                className={classes.cart}
            ></div>
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
        </>
    );
};

export default FlightCart;
