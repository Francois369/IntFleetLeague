import { RequestHandler, NextFunction } from "express";
import TeamModel from "../models/team";

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
