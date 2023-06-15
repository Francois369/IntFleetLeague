import express from "express";
import * as TeamsController from "../controllers/teams-contoller";

const router2 = express.Router();

router2.get("/", TeamsController.getTeams);
router2.post("/", TeamsController.createTeam);

export default router2;
