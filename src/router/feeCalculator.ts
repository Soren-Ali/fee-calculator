import { Router } from "express";
import { calculateDistributions, calculatePrices } from "../controller";

const router = Router();

router.post("/calculatePrices", calculatePrices);

router.post("/calculateDistributions", calculateDistributions);

export default router;
