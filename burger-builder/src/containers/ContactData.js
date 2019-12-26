import React, { useCallback, useRef, useState } from "react";
import { UseForm } from "../hooks/UseForm";
import Button, { buttonType } from "../components/UI/Button/Button";
import axios from "../axios-orders";
import WithErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

ContactData.propTypes = {};

function ContactData(props) {
  const counter = useRef(0);
  console.log("ContactData rendered: ", counter.current++);
  const [form, formHandler] = UseForm({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      const order = {
        ingredients: props.ingredients,
        price: props.price,
        customer: {
          name: form.name,
          email: form.email
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
    [setLoading, props.ingredients, props.price, form, props.history]
  );

  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={{ margin: "20px auto", width: "80%", textAlign: "center" }}>
      <h4>Enter your contact: {JSON.stringify(form)}</h4>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={formHandler}
        />
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={formHandler}
        />
        <Button buttonType={buttonType.SUCCESS} onClick={submitForm}>
          <>Order</>
        </Button>
      </form>
    </div>
  );
}

export default WithErrorHandler(withRouter(ContactData), axios);
