import React, { useState, useEffect, useRef, useCallback } from "react";
import Burger from "../components/Burger/Burger";
import { ingredientType } from "../components/Burger/Ingredients/Ingredients";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import { BurgerContext } from "../hooks/BurgerContext";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

const ingredientsPrices = {};

const BurgerBuilder = props => {
  const counter = useRef(0);
  console.log("BurgerBuilder rendered: ", counter.current++);
  const [ingredients, setIngredients] = useState({});
  const [price, setPrice] = useState(2);
  const [purchase, setPurchase] = useState(false);

  const purchaseHandler = useCallback(() => {
    setPurchase(true);
  }, [setPurchase]);
  const cancelPurchaseHandler = useCallback(() => {
    setPurchase(false);
  }, [setPurchase]);
  const submitPurchaseHandler = useCallback(() => {
    alert("Purchased successfully");
  }, []);

  useEffect(() => {
    let ig = {};
    Object.keys(ingredientType).forEach(key => {
      ig[key] = 0;
      ingredientsPrices[key] = Math.ceil(Math.random() * 10, 2);
    });
    setIngredients(ig);
  }, []);

  const addIng = useCallback(
    type => {
      setIngredients(oldState => {
        return { ...oldState, [type]: oldState[type] + 1 };
      });

      setPrice(oldState => {
        return oldState + ingredientsPrices[type];
      });
    },
    [setIngredients, setPrice]
  );

  const removeIng = useCallback(
    type => {
      setIngredients(oldState => {
        return {
          ...oldState,
          [type]: oldState[type] - 1
        };
      });

      setPrice(oldState => {
        return oldState - ingredientsPrices[type];
      });
    },
    [setIngredients, setPrice]
  );

  let disabledInfo = {};
  Object.keys(ingredients).forEach(igkey => {
    disabledInfo[igkey] = ingredients[igkey] <= 0;
  });

  return (
    <>
      <Modal show={purchase} hide={cancelPurchaseHandler}>
        <OrderSummary
          totalPrice={price}
          ingredients={ingredients}
          onCancel={cancelPurchaseHandler}
          onSubmit={submitPurchaseHandler}
        />
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
export default BurgerBuilder;
