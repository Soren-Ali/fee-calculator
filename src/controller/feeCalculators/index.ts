const fees = require("../../data/fees_example");

import { calculatePricesFunction } from "../../utils/orderTotal";
import { getDistributions } from "../../utils/distributions";

const calculatePrices = async (req, res) => {
  console.log(res.body);
  const orders = req.body.orders;
  const prices = calculatePricesFunction(orders, fees, "route");
  res.json(prices);
};

const calculateDistributions = async (req, res) => {
  const orders = req.body.orders;
  const distributions = calculateDistributionsFun(orders);
  res.json(distributions);
};

export { calculatePrices, calculateDistributions };

function calculateDistributionsFun(orders: any[]): any[] {
  const result: any[] = [];

  orders.forEach((order) => {
    const orderDistributions = getDistributions(order);
    result.push({
      order_id: order.order_number,
      distributions: orderDistributions,
    });
  });

  return result;
}
