require("dotenv").config();

import express from "express";
import router from "./router";
import { calculateOrderTotal } from "../src/utils/orderTotal";
import { distributions } from "../src/utils/distributions";

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

app.use("/", router);

console.log("// Prices //");
calculateOrderTotal();

console.log("// Distributions //");
distributions();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
