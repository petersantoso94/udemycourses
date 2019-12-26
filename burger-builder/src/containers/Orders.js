import React, { useEffect, useState, useRef } from "react";
import Order from "../components/Order/Order";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import WithErrorHandler from "../hoc/WithErrorHandler/WithErrorHandler";

function Orders(props) {
  const counter = useRef(0);
  console.log("Orders rendered: ", counter.current++);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders.json")
      .then(y => {
        setLoading(false);
        const arrData = [];
        for (let key in y.data) {
          const curr = y.data[key];
          arrData.push({
            ingredients: curr.ingredients,
            price: curr.price,
            id: key
          });
        }
        setData(arrData);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [setData, setLoading]);
  if (loading) {
    return <Spinner />;
  }
  if (data.length === 0) {
    return <h1>No Data Found!</h1>;
  }
  return (
    <div>
      {data.map(x => (
        <Order ingredients={x.ingredients} price={x.price} key={x.id} />
      ))}
    </div>
  );
}

export default WithErrorHandler(Orders, axios);
