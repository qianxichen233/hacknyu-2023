import { useState } from "react";
import LocationEnterCart from "./LocationEnterCart";
import classes from "./LocationSearchBar.module.css";

import { Cancel, Location } from "./UI/Icons";
import Modal from "./UI/Modal";

const convert = (address) => {
    if (address.city) return address.city;
    else if (address.state) return address.state;
    else if (address.country) return address.country;
    return address.plain;
};

const initialState = {
    valid: false,
    country: "",
    state: "",
    city: "",
    plain: "",
};

const LocationSearchBar = (props) => {
    const { address, setAddress } = props;
    const [isEnterAddress, setIsEnterAddress] = useState(false);

    const addressChangeHandler = (address) => {
        setAddress({ valid: true, ...address });
        setIsEnterAddress(false);
    };

    const clearAddress = () => {
        setAddress(initialState);
    };

    return (
        <>
            <div
                className={classes.container}
                onClick={setIsEnterAddress.bind(null, true)}
            >
                <div className={classes.icon}>
                    <Location size={30} />
                </div>
                <span
                    className={classes.address}
                    style={{ color: address.valid ? "black" : "grey" }}
                >
                    {address.valid ? convert(address) : "Enter Your Address"}
                </span>
                <div
                    className={classes.cancel}
                    onClick={(e) => {
                        e.stopPropagation();
                        clearAddress();
                    }}
                >
                    <Cancel size={20} />
                </div>
                {isEnterAddress && (
                    <LocationEnterCart setAddress={addressChangeHandler} />
                )}
            </div>
            <Modal
                active={isEnterAddress}
                deactive={setIsEnterAddress.bind(null, false)}
                color="transparent"
            />
        </>
    );
};

export default LocationSearchBar;
