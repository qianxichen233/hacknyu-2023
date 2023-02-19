import { parseAddress } from "@/utils/utility";
import { useState } from "react";
import classes from "./LocationEnterCart.module.css";
import { Location, Sad, Search } from "./UI/Icons";
import PlaceholderBar from "./UI/PlaceholderBar";

const autoCompleteTime = 500;

const LocationEnterCart = (props) => {
    const [enteredAddress, setEnteredAddress] = useState({
        value: "",
        timeoutID: null,
    });

    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [noResult, setNoResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showHint, setShowHint] = useState(true);

    const showSearchResult = (
        showHint,
        isLoading,
        noResult,
        addressSuggestions
    ) => {
        if (showHint) {
            return (
                <div className={classes.hint}>
                    <div>
                        <Search size={40} />
                    </div>
                    <span>Search by Country/State/City</span>
                </div>
            );
        }
        if (isLoading) {
            return <PlaceholderBar number={3} />;
        }
        if (noResult) {
            return (
                <div className={classes.hint}>
                    <div>
                        <Sad size={40} />
                    </div>
                    <span>No Avaliable Suggestion</span>
                    {/* <span>Press Enter to use this address</span> */}
                </div>
            );
        }
        return addressSuggestions.map((address) => {
            const subLoc = address.city
                ? `${address.state}, ${address.city}`
                : address.state;

            return (
                <div
                    key={address.id}
                    className={classes.suggestion}
                    onClick={props.setAddress.bind(null, address)}
                >
                    <div className={classes.icon}>
                        <Location size={30} />
                    </div>
                    <div className={classes.address_info}>
                        <div className={classes.main_text}>
                            {address.country}
                        </div>
                        <div className={classes.sub_text}>{subLoc}</div>
                    </div>
                </div>
            );
        });
    };

    const autoCompleteAddress = async (address) => {
        if (address === "") return;
        //TO DO
        //Replace with backend api later
        let result;
        try {
            result = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.Geoapify_API_key}`
            );
        } catch (e) {
            console.log(e);
            setIsLoading(false);
            setNoResult(true);
            return;
        }
        const parsedAddress = parseAddress(await result.json());
        if (parsedAddress.length === 0) setNoResult(true);
        setAddressSuggestions(parsedAddress);
        setIsLoading(false);
    };

    const onAddressChangeHandler = (e) => {
        const id = setTimeout(() => {
            autoCompleteAddress(e.target.value);
        }, autoCompleteTime);

        setEnteredAddress((prev) => {
            clearTimeout(prev.timeoutID);
            return {
                value: e.target.value,
                timeoutID: id,
            };
        });
        setAddressSuggestions([]);
        if (e.target.value !== "") {
            setIsLoading(true);
            setShowHint(false);
        } else setShowHint(true);

        setNoResult(false);
    };

    return (
        <div className={classes.container} onClick={(e) => e.stopPropagation()}>
            <div className={classes.input}>
                <input
                    autoFocus={true}
                    value={enteredAddress.value}
                    onChange={onAddressChangeHandler}
                    placeholder="What's Your Location"
                    onKeyDown={(e) => {
                        // if (e.key === "Enter")
                        //     props.setAddress({
                        //         plain: enteredAddress.value,
                        //     });
                    }}
                ></input>
            </div>
            {showSearchResult(
                showHint,
                isLoading,
                noResult,
                addressSuggestions
            )}
        </div>
    );
};

export default LocationEnterCart;
