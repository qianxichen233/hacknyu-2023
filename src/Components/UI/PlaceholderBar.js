import classes from "./PlaceholderBar.module.css";

const Bar = () => {
    return <div className={classes.bar}></div>;
};

const PlaceholderBar = (props) => {
    return (
        <div className={classes.container}>
            {((number) => {
                let bars = [];
                while (number--) bars.push(<Bar key={number} />);
                return bars;
            })(props.number)}
        </div>
    );
};

export default PlaceholderBar;
