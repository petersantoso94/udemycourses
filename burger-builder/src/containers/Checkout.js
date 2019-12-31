import React, { useEffect, useCallback, useRef } from "react";
import CheckoutSummary from "../components/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { initOrder } from "../store/actions/order";
const ContactData = React.lazy(() => import("./ContactData"));

Checkout.propTypes = {};

function Checkout({ initPurchase, history, match, ingredients, price }) {
  const counter = useRef(0);
  console.log("Checkout rendered: ", counter.current++);
  // const [ingredients, setIngredients] = useState({});
  // const [price, setPrice] = useState(0);

  useEffect(() => {
    initPurchase();
    if (
      Object.entries(ingredients).length === 0 &&
      ingredients.constructor === Object
    ) {
      history.replace("/");
    }
  }, []);
  // useEffect(() => {
  //   let ig = {};
  //   if (!location.search) {
  //     history.replace("/");
  //   }
  //   const query = new URLSearchParams(location.search);
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       setPrice(+param[1]);
  //     } else ig[param[0]] = +param[1];
  //   }
  //   setIngredients(ig);
  // }, [history, setPrice, location.search]);

  const submitPurchaseHandler = useCallback(() => {
    history.push(match.path + "/contact-data");
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
    //     history.push("/");
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     console.log(err);
    //   });
    //   }, [ingredients, price, setLoading, history]);
  }, [history, match.path]);

  const cancelPurchaseHandler = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        price={price}
        cancelHandler={cancelPurchaseHandler}
        submitHandler={submitPurchaseHandler}
      />
      <Route path={match.path + "/contact-data"} component={ContactData} />
    </div>
  );
}
const mapStateToProps = state => ({
  ...state.burger
});

const mapDispatchToProps = dispatch => ({
  initPurchase: () => {
    dispatch(initOrder());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
