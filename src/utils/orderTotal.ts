import { Fee } from "../interfaces/fee.type";
import { Order, OrderItem } from "../interfaces/order.type";

const fees = require("../data/fees_example");
const orders = require("../data/orders_example");

export function calculatePricesFunction(
  orders: Order[],
  fees: Fee[],
  path: "server" | "route"
) {
  const result: any[] = [];

  orders.forEach((order) => {
    console.log(`Order ID: ${order.order_number}`);

    let orderTotal = 0;
    let index = 1;

    for (const item of order.order_items) {
      const itemFees = calculateItemFees(item, fees);
      const itemTotal = itemFees.reduce(
        (sum, fee) => sum + parseFloat(fee.amount),
        0
      );
      orderTotal += itemTotal;

      console.log(`\tOrder item ${index++}: $${itemTotal}`);
    }

    console.log(`\n\tOrder total: $${orderTotal.toFixed(2)}\n`);

    result.push({
      order_id: order.order_number,
      order_items: order.order_items.map((item, index) => ({
        item_id: index + 1,
        price: calculateItemFees(item, fees).reduce(
          (sum, fee) => sum + parseFloat(fee.amount),
          0
        ),
      })),
      order_total: orderTotal.toFixed(2),
    });
  });

  if (path === "route") {
    return result;
  }
}

function calculateItemFees(item: OrderItem, fees: Fee[]): any[] {
  const itemFees: any[] = [];

  const applicableFees = fees.find(
    (feeItem) => feeItem.order_item_type === item.type
  );
  if (!applicableFees) {
    return [];
  }

  for (const fee of applicableFees.fees) {
    let feeAmount = 0;

    if (fee.type === "flat") {
      feeAmount = parseFloat(fee.amount);
    } else if (fee.type === "per-page") {
      const numPages = Math.max(item.pages, 0);
      feeAmount = numPages * parseFloat(fee.amount);
    }

    const itemFee = {
      type: fee.name,
      amount: feeAmount,
    };
    itemFees.push(itemFee);
  }

  return itemFees;
}
export const calculateOrderTotal = () => {
  calculatePricesFunction(orders, fees, "server");
};
