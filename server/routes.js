import api from "./api.js";
import cache from "memory-cache";

function setup(app) {
  const mem = new cache.Cache();

  const getCached = async (key, dur, fallback) => {
    const cached = mem.get(key);
    if (cached) {
      return cached;
    } else {
      const result = await fallback();
      mem.put(key, result, dur*1000);
      return result;
    }
  };

  const memeFilter = 0.001;

  const processOrders = (orders, exrate) => {
    //console.log(orders);
    for (let i = 0; i < orders.length; ++i) {
      orders[i].fiat = orders[i].volume * orders[i].price * exrate;
    }

    //filter out meme prices
    return orders.filter(ord => ord.price < memeFilter);
  };

  app.get("/api/orderbook", async function (req, res) {
    try {
      const book = await getCached("orderbook", 30, api.getOrderBook);
      const exrate = await getCached("btcrub", 10, api.getBtcCost);
      book.buyLevels = processOrders(book.buyLevels, exrate);
      book.sellLevels = processOrders(book.sellLevels, exrate);

      res.status(200).send(book);

    } catch (err) {
      console.log(err.message);
      res.status(500).send("error");
    }
  });

}

export default {
  setup
};
