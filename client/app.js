import React from "react";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import OrderBook from "./components/orderbook.js";
import "./css/app.scss";

const App = () => {
  return (<>
    <Header />
    <OrderBook />
    <Footer />
  </>);
};

export default App;

