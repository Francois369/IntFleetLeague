import { RequestHandler, NextFunction } from "express";
import MatchModel from "../models/match";
import createHttpError, { UnknownError } from "http-errors";

interface CreateMatchBody {
  teamname1: String;
  teamname2: String;
  team1Goals: string;
  team2Goals: string;
}

export const createMatch: RequestHandler<
  unknown,
  unknown,
  CreateMatchBody,
  unknown
> = async (req, res, next) => {
  const teamname1 = req.body.teamname1;
  const teamname2 = req.body.teamname2;
  const score1 = req.body.team1Goals;
  const score2 = req.body.team2Goals;
  try {
    if (!teamname1) {
      throw createHttpError(400, "TeamName 1 Must Exist");
    }
    if (!teamname2) {
      throw createHttpError(400, "Teamname 2 must Exist");
    }
    const newMatch = await MatchModel.create({
      teamname1: teamname1,
      teamname2: teamname2,
      team1Goals: score1,
      team2Goals: score2,
    });
    res.status(201).json(newMatch);
  } catch (error) {
    next(error);
  }
};
