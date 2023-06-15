import { RequestHandler, NextFunction } from "express";
import MatchModel from "../models/match";
import TeamModel from "../models/team";
import createHttpError, { UnknownError } from "http-errors";

interface CreateMatchBody {
  teamname1: String;
  teamname2: String;
  team1Goals: Number;
  team2Goals: Number;
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
    await assignResults(teamname1, score1, teamname2, score2);
    res.status(201).json(newMatch);
  } catch (error) {
    next(error);
  }
};

async function assignResults(
  team1Name: String,
  team1Goals: Number,
  team2name: String,
  team2Goals: Number
) {
  if (+team1Goals > +team2Goals) {
    const WinningTeam = await TeamModel.findOne({ teamname: team1Name });
    const losingTeam = await TeamModel.findOne({ teamname: team2name });
    const goalDiffUpdate = +WinningTeam!.goalsDiff + +team1Goals - +team2Goals;
    await TeamModel.findOneAndUpdate(
      { teamname: team1Name },
      {
        goalsFor: WinningTeam!.goalsFor + +team1Goals,
        points: WinningTeam!.points + +3,
        goalsAgainst: WinningTeam!.goalsAgainst + +team2Goals,
        matchesWon: WinningTeam!.matchesWon + 1,
        goalsDiff: +WinningTeam!.goalsDiff + +team1Goals - +team2Goals,
      }
    );
    const matchesLostUpdate = losingTeam!.matchesLost + +1;
    const losingTeamName = await TeamModel.findOneAndUpdate(
      { teamname: losingTeam!.teamname },
      {
        goalsFor: losingTeam!.goalsFor + +team2Goals,
        goalsAgainst: losingTeam!.goalsAgainst + +team1Goals,
        matchesLost: losingTeam!.matchesLost + +1,
        goalsDiff: losingTeam!.goalsDiff + +team2Goals - +team1Goals,
      }
    );
  }
}

// matchesLost: { type: Number, default: 0, required: true },
// matchesDrawn: { type: Number, default: 0, required: true },
// goalsFor: { type: Number, default: 0, required: true },
// goalsAgainst: { type: Number, default: 0, required: true },
// goalsDiff: { type: Number, default: 0, required: true }
