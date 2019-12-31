import React, { useCallback, useRef } from "react";
import { UseForm, ValidationType } from "../hooks/UseForm";
import Button, { buttonType } from "../components/UI/Button/Button";
import axios from "../axios-orders";
import WithErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../components/UI/Spinner/Spinner";
import { withRouter, Redirect } from "react-router-dom";
import Input, { inputType } from "../components/UI/Input/Input";
import { connect } from "react-redux";
import { submitOrder } from "../store/actions/order";

ContactData.propTypes = {};

function ContactData({
  loading,
  ingredients,
  price,
  purchased,
  submitOrderHandler
}) {
  const counter = useRef(0);
  console.log("ContactData rendered: ", counter.current++);
  const { form, onChangeHandler, onBlurHandler, isFormValid } = UseForm({
    name: {
      value: "",
      validation: { [ValidationType.REQUIRED]: "Name is required!" },
      errorMsg: ""
    },
    email: {
      value: "",
      validation: [ValidationType.REQUIRED, ValidationType.MAX5],
      errorMsg: ""
    },
    delivery: { value: "", validation: [], errorMsg: "" }
  });
  // const [loading, setLoading] = useState(false);

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      if (!isFormValid()) return;
      // setLoading(true);
      const order = {
        ingredients: ingredients,
        price: price,
        customer: {
          name: form.name.value,
          email: form.email.value,
          delivery: form.delivery.value
        }
      };
      submitOrderHandler(order);
    },
    [
      // setLoading,
      ingredients,
      price,
      form,
      isFormValid,
      submitOrderHandler
    ]
  );

  if (purchased) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={{ margin: "20px auto", width: "80%", textAlign: "center" }}>
      <h4>Enter your contact: {JSON.stringify(form)}</h4>
      <form onSubmit={submitForm}>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Your name"
          errortext={form.name.errorMsg}
          value={form.name.value}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
        />
        <Input
          label="Email"
          customtype={inputType.TEXT_AREA}
          type="text"
          name="email"
          placeholder="Your email"
          errortext={form.email.errorMsg}
          value={form.email.value}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
        />
        <Input
          label="Delivery Options"
          customtype={inputType.SELECT}
          name="delivery"
          errortext={form.delivery.errorMsg}
          value={form.delivery.value}
          onChange={onChangeHandler}
        >
          <option value="">Please choose the delivery option</option>
          <option value="faster">Faster (7D)</option>
          <option value="fastest">Fastest (3D)</option>
        </Input>
        <Button buttonType={buttonType.SUCCESS} onClick={() => {}}>
          <>Order</>
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.burger,
  ...state.order
});

const mapDispatchToProps = dispatch => ({
  submitOrderHandler: payload => {
    dispatch(submitOrder(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(withRouter(ContactData), axios));
