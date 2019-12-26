import React, { Suspense } from "react";
import Layout from "./components/Layout/Layout";
// import BurgerBuilder from "./containers/BurgerBuilder";
// import Checkout from "./containers/Checkout";
import { Switch, Route } from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";

const BurgerBuilder = React.lazy(() => import("./containers/BurgerBuilder"));
const Checkout = React.lazy(() => import("./containers/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders"));

function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route
              path="/"
              render={props => <BurgerBuilder initialPrice={3} {...props} />}
            />
          </Switch>
        </Suspense>
        {/* <BurgerBuilder initialPrice={3}></BurgerBuilder>
        <Checkout /> */}
      </Layout>
    </div>
  );
}

export default App;
