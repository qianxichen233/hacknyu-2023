import Link from "next/link";
import classes from "./DetailCart.module.css";

const DetailCart = (props) => {
    return (
        <div className={classes.cart}>
            <div className={classes.title}>{props.hackathon_info.Name}</div>
            <div className={classes.line} />
            {Object.keys(props.hackathon_info).map((key) => {
                if (key === "Name") return;
                const { value, Icon } = props.hackathon_info[key];

                let text;
                if (key === "URL")
                    text = (
                        <Link className={classes.itemValue} href={value.url}>
                            {value.text}
                        </Link>
                    );
                else text = <span className={classes.itemValue}>{value}</span>;

                return (
                    <div key={key} className={classes.item}>
                        <span>{key}</span>
                        {Icon && <Icon />}
                        {text}
                    </div>
                );
            })}
            <div className={classes.line} />
            <div className={classes.title}>Flight Information</div>
            <div className={classes.line} />
            {Object.keys(props.flight_info).map((key) => {
                const { value, Icon } = props.flight_info[key];

                return (
                    <div key={key} className={classes.item}>
                        <span>{key}</span>
                        {Icon && <Icon />}
                        <span className={classes.itemValue}>{value}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default DetailCart;
