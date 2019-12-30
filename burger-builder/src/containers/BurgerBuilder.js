import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import Burger from "../components/Burger/Burger";
import PropTypes from "prop-types";
// import { ingredientType } from "../components/Burger/Ingredients/Ingredients";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import { BurgerContext } from "../hooks/BurgerContext";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import { connect } from "react-redux";
import * as actionType from "../store/actions/actionTypes";
import { setInitValue } from "../store/actions/burgerBuilder";
import WithErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../axios-orders";
// import Spinner from "../components/UI/Spinner/Spinner";
// import WithErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";

// const ingredientsPrices = {};

const BurgerBuilder = ({
  initialPrice,
  history,
  setInitialIngredients,
  addIngredient,
  removeIngredient,
  ingredients,
  price
}) => {
  const counter = useRef(0);
  console.log("BurgerBuilder rendered: ", counter.current++);
  // const [ingredients, setIngredients] = useState({});
  // const [price, setPrice] = useState(initialPrice ? initialPrice : 2);
  const [purchase, setPurchase] = useState(false);
  // const [loading, setLoading] = useState(false);

  const purchaseHandler = useCallback(() => {
    setPurchase(true);
  }, [setPurchase]);
  const cancelPurchaseHandler = useCallback(() => {
    setPurchase(false);
  }, [setPurchase]);

  const submitPurchaseHandler = useCallback(() => {
    // const queryParams = [];
    // for (let i in ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + price);
    history.push({
      pathname: "/checkout"
      // search: "?" + queryParams.join("&")
    });
  }, [history]);

  useEffect(() => {
    // let ig = {};
    // Object.keys(ingredientType).forEach(key => {
    //   ig[key] = 0;
    //   ingredientsPrices[key] = Math.ceil(Math.random() * 10, 2);
    // });
    // setIngredients(ig);

    // set up redux initial state
    setInitialIngredients({
      price: initialPrice ? initialPrice : 2
    });
  }, [initialPrice, setInitialIngredients]);

  const addIng = useCallback(
    type => {
      // setIngredients(oldState => {
      //   return { ...oldState, [type]: oldState[type] + 1 };
      // });

      // setPrice(oldState => {
      //   return oldState + ingredientsPrices[type];
      // });

      // dispatch event to update ingredients state
      addIngredient({ type });
    },
    // [setIngredients, setPrice, addIngredient]
    [addIngredient]
  );

  const removeIng = useCallback(
    type => {
      // setIngredients(oldState => {
      //   return {
      //     ...oldState,
      //     [type]: oldState[type] - 1
      //   };
      // });

      // setPrice(oldState => {
      //   return oldState - ingredientsPrices[type];
      // });

      removeIngredient({ type });
    },
    // [setIngredients, setPrice]
    [removeIngredient]
  );

  let disabledInfo = {};
  Object.keys(ingredients).forEach(igkey => {
    disabledInfo[igkey] = ingredients[igkey] <= 0;
  });

  const orderSum = useMemo(
    () => (
      <OrderSummary
        totalPrice={price}
        ingredients={ingredients}
        onCancel={cancelPurchaseHandler}
        onSubmit={submitPurchaseHandler}
      />
    ),
    [purchase]
  );

  return (
    <>
      <Modal show={purchase} hide={cancelPurchaseHandler}>
        {orderSum}
      </Modal>
      <Burger ingredients={ingredients} />
      <BurgerContext.Provider value={{ addIng, removeIng }}>
        <BuildControls
          totalPrice={price}
          disabledInfo={disabledInfo}
          purchaseHandler={purchaseHandler}
        />
      </BurgerContext.Provider>
    </>
  );
};

BurgerBuilder.propTypes = {
  initialPrice: PropTypes.number
};
// export default WithErrorHandler(BurgerBuilder, axios);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    setInitialIngredients: payload => dispatch(setInitValue(payload)),
    addIngredient: payload =>
      dispatch({ type: actionType.ADD_CHOSEN_INGREDIENT, payload }),
    removeIngredient: payload =>
      dispatch({ type: actionType.REMOVE_ONE_CHOSEN_INGREDIENT, payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
