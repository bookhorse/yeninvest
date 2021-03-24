import React from "react";
import PropTypes from "prop-types";

const EmptySide = () => (<div>Loading...</div>);

const BookSide = ({data}) => {
  const total = Number(data 
    ? data.reduce((acc, cur) => acc + cur.fiat, 0)
    : 0).toLocaleString("en");

  let acc = 0;

  const chooseClass = el => el.volume > 100000
    ? "bigwall"
    : el.volume > 50000
      ? "wall"
      : null;

  const orders = data
    ? data.map(el => {
      const price = Number(el.price).toFixed(8);
      const fiat = Number(el.fiat).toFixed(2);
      acc += el.fiat;
      const accfiat = Number(acc).toFixed(2);
      return <div key={el.price} className={chooseClass(el)}>
        {price} - {fiat} &#8381; - {accfiat} &#8381;
      </div>;
    })
    : null;

  return data 
    ? (
      <div>
        <div className="header">Total: {total} &#8381;</div>
        <div className="orders">{orders}</div>
      </div>
    ) 
    : <EmptySide />;
};

BookSide.propTypes = {
  data: PropTypes.array,
};


export default BookSide;
