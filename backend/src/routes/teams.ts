import express from "express";
import * as TeamsController from "../controllers/teams-contoller";

const router = express.Router();

router.get("/", TeamsController.getTeams);

export default router;
