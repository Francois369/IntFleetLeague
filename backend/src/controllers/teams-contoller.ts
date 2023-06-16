import { RequestHandler, NextFunction } from "express";
import TeamModel from "../models/team";
import MatchModel from "../models/match";
import createHttpError, { UnknownError } from "http-errors";
import { model } from "mongoose";

export const restartLeeague: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    await TeamModel.deleteMany({});
    await MatchModel.deleteMany({});
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};

export const getTeams: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const teams = await TeamModel.find().exec();

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

interface CreateTeamBody {
  teamname: string;
}

export const createTeam: RequestHandler<
  unknown,
  unknown,
  CreateTeamBody,
  unknown
> = async (req, res, next) => {
  const teamname = req.body.teamname;
  try {
    if (!teamname) {
      throw createHttpError(400, "note must have a title");
    }
    const newNote = await TeamModel.create({
      teamname: teamname,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
