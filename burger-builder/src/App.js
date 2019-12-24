import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder initialPrice={3}></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
