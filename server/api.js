import fetch from "node-fetch";

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("err");
        }
      })
      .then(json => resolve(json))
      .catch(e => {
        reject(e);
      });

  });

}

function getBtcCost() {
  const url = "https://api.crex24.com/v2/public/tickers?instrument=BTC-RUB";
  return fetchJson(url).then(json => {
    return json[0].last;
  });
}

function getOrderBook() {
  const url = "https://api.crex24.com/v2/public/orderBook?instrument=YTN-BTC&limit=9999";

  return fetchJson(url);
}

export default {
  getBtcCost,
  getOrderBook
};
