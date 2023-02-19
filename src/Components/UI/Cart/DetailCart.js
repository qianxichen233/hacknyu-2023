import Link from "next/link";
import classes from "./DetailCart.module.css";

const DetailCart = (props) => {
  return (
    <div className={classes.cart}>
      <div className={classes.title}>{props.hackathon_info.Name}</div>
      {/* <div className={classes.line} /> */}
      {Object.keys(props.hackathon_info).map((key) => {
        if (key === "name") return;
        const { value, Icon } = props.hackathon_info[key];

        let text;
        if (key === "url")
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
      {/* <div className={classes.line} /> */}

      {/* {Object.keys(props.flight_info).map((key) => {
        const { value, Icon } = props.flight_info[key];

        return (
          <div key={key} className={classes.item}>
            <span>{key}</span>
            {Icon && <Icon />}
            <span className={classes.itemValue}>{value}</span>
          </div>
        );
      })} */}
      <div className={classes.flightContent}>
        <div className={classes.flightRow}>
          <div className={classes.flightFrom}>
            <span className={classes.fromCode}>
              {props.flight_info.source.code.split("").map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </span>
            <span className={classes.fromCity}>
              {props.flight_info.source.value}
            </span>
          </div>
          <div className={classes.plane}>
            <img
              style={{ width: "90px" }}
              src="https://cdn.onlinewebfonts.com/svg/img_537856.svg"
              alt=""
            />
          </div>
          <div className={classes.flightTo}>
            <span className={classes.toCode}>
              {/* <div className={classes.text}>MUC</div> */}
              {/* remember to reverse the code */}
              {props.flight_info.destination.code.split("").reverse().map((item, index) => (
                <span key={index}>{item}</span>
              ))}
              {/* <span>C</span>
              <span>U</span>
              <span>M</span> */}
            </span>
            <span className={classes.toCity}>
              {props.flight_info.destination.value}
            </span>
          </div>
        </div>
        <div className={classes.flightDetailRow}>
          <div className={classes.flightOperator}>
            <span className={classes.flightTitle}>OPERATOR</span>
            <span className={classes.detail}>{props.flight_info.operator}</span>
          </div>
          <div className={classes.flightNumber}>
            <span className={classes.flightTitle}>FLIGHT</span>
            <span className={classes.flightdetail}>
              {props.flight_info.flightID}
            </span>
          </div>
          <div className={classes.flightPrice}>
            <span className={classes.flightTitle}>PRICE</span>
            <span className={classes.flightdetail}>
              {props.flight_info.price.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
