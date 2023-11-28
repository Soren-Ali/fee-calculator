import { Router } from "express";

import feeCalculator from "./feeCalculator";

const router = Router();

router.use("/fee", feeCalculator);

export default router;
