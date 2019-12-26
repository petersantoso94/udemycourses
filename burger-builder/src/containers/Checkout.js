import React, { useState, useEffect, useCallback, useRef } from "react";
import CheckoutSummary from "../components/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
const ContactData = React.lazy(() => import("./ContactData"));

Checkout.propTypes = {};

function Checkout(props) {
  const counter = useRef(0);
  console.log("Checkout rendered: ", counter.current++);
  const [ingredients, setIngredients] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let ig = {};
    if (!props.location.search) {
      props.history.replace("/");
    }
    const query = new URLSearchParams(props.location.search);
    for (let param of query.entries()) {
      if (param[0] === "price") {
        setPrice(+param[1]);
      } else ig[param[0]] = +param[1];
    }
    setIngredients(ig);
  }, [props.history, setPrice]);

  const submitPurchaseHandler = useCallback(() => {
    props.history.push(props.match.path + "/contact-data");
    // // alert("Purchased successfully");
    // setLoading(true);
    // const order = {
    //   ingredients,
    //   price,
    //   customer: {
    //     name: "p",
    //     address: {
    //       street: "test",
    //       zip: "100",
    //       country: "Indie"
    //     }
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(resp => {
    //     setLoading(false);
    //     alert("Purchase Success, please process your next order!");
    //     props.history.push("/");
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     console.log(err);
    //   });
    //   }, [ingredients, price, setLoading, props.history]);
  }, [props.history, props.match.path]);

  const cancelPurchaseHandler = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        cancelHandler={cancelPurchaseHandler}
        submitHandler={submitPurchaseHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        render={() => <ContactData ingredients={ingredients} price={price} />}
      />
    </div>
  );
}

export default Checkout;
