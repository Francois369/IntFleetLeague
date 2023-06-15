import express from "express";
import * as MatchController from "../controllers/match-controller";

const router = express.Router();
console.log("inside Controller");
router.post("/", MatchController.createMatch);

export default router;
