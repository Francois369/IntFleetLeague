import express from "express";
import * as TeamsController from "../controllers/teams-contoller";

const router2 = express.Router();

router2.get("/", TeamsController.getTeams);
router2.post("/", TeamsController.createTeam);
router2.delete("/", TeamsController.restartLeeague);

export default router2;
