import { Distributions } from "../interfaces/fee.type";
import { Order } from "../interfaces/order.type";

const fees = require("../data/fees_example");
const orders = require("../data/orders_example");

function calculateTotalDistributions(orders: Order[]) {
  //@ts-ignore
  const fundTotals: Distributions = {};
  orders.forEach((order) => {
    console.log(`Order ID: ${order.order_number}`);

    const distributions: Distributions = getDistributions(order);

    Object.entries(distributions).forEach(([fund, amount]) => {
      console.log(`  Fund - ${fund}: $${amount.toFixed(2)}`);
      if (!fundTotals[fund]) {
        fundTotals[fund] = 0;
      }
      fundTotals[fund] += amount;
    });

    console.log("\n");
  });

  console.log("Total distributions:");
  Object.entries(fundTotals).forEach(([fund, total]) => {
    console.log(`  Fund - ${fund}: $${total.toFixed(2)}`);
  });
}

// helper function for distributions
export const getDistributions = (order: Order) => {
  const distributions: any = {};

  order.order_items.forEach((item) => {
    const applicableFees = fees.find(
      (fee: any) => fee.order_item_type === item.type
    );

    if (applicableFees) {
      applicableFees.distributions.forEach((distribution: any) => {
        const fundName = distribution.name || "Other";
        const fundAmount = parseFloat(distribution.amount);

        if (!distributions[fundName]) {
          distributions[fundName] = 0;
        }

        distributions[fundName] += fundAmount;
      });
    }
  });

  return distributions;
};

//TO be called in the server.ts
export const distributions = () => {
  calculateTotalDistributions(orders);
};
