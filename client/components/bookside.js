import React from "react";
import PropTypes from "prop-types";

const EmptySide = () => (<div>Loading...</div>);

const BIGWALL = 100000;
const SMALLWALL = 50000;
const LOWVOL = 1000;

const BookSide = ({data}) => {
  const total = Number(data 
    ? data.reduce((acc, cur) => acc + cur.fiat, 0)
    : 0).toLocaleString("en");

  let acc = 0;

  const chooseClass = el => el.volume > BIGWALL
    ? "bigwall"
    : el.volume > SMALLWALL
      ? "wall"
      : null;

  const orders = data
    ? data.map(el => {
      const price = Number(el.price).toFixed(9);
      const fiat = Number(el.fiat).toFixed(2);
      acc += el.fiat;
      const accfiat = Number(acc).toFixed(2);
      const lowVol = el.volume < LOWVOL;
      const curSign = "\u20BD";

      const text = `${price} - ${fiat} ${curSign} - ${accfiat} ${curSign}`;

      return lowVol
        ? null
        : <div key={el.price} className={chooseClass(el)}>
          {text}
        </div>;
    })
    : null;

  return data 
    ? (
      <div className="side">
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
