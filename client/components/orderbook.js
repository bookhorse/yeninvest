import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BookSide from "./bookside.js";

const OrderBook = () => {
  const [book, setBook] = useState({ });

  useEffect(async () => {
    const result = await fetch("/api/orderbook");
    const json = await result.json();
 
    setBook(json);
  }, []);

  return <div className="flex-row book">
    <BookSide data={book.buyLevels} />
    <BookSide data={book.sellLevels} />
  </div>;
};

OrderBook.propTypes = {
  data: PropTypes.object,
};


export default OrderBook;
