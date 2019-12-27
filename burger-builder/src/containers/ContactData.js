import React, { useCallback, useRef, useState } from "react";
import { UseForm, ValidationType } from "../hooks/UseForm";
import Button, { buttonType } from "../components/UI/Button/Button";
import axios from "../axios-orders";
import WithErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input, { inputType } from "../components/UI/Input/Input";

ContactData.propTypes = {};

function ContactData(props) {
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
  const [loading, setLoading] = useState(false);

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      if (!isFormValid()) return;
      setLoading(true);
      const order = {
        ingredients: props.ingredients,
        price: props.price,
        customer: {
          name: form.name.value,
          email: form.email.value,
          delivery: form.delivery.value
        }
      };
      axios
        .post("/orders.json", order)
        .then(resp => {
          setLoading(false);
          alert("Purchase Success, please process your next order!");
          props.history.push("/");
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    },
    [
      setLoading,
      props.ingredients,
      props.price,
      form,
      props.history,
      isFormValid
    ]
  );

  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={{ margin: "20px auto", width: "80%", textAlign: "center" }}>
      <h4>Enter your contact: {JSON.stringify(form)}</h4>
      <form>
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
        <Button buttonType={buttonType.SUCCESS} onClick={submitForm}>
          <>Order</>
        </Button>
      </form>
    </div>
  );
}

export default WithErrorHandler(withRouter(ContactData), axios);
