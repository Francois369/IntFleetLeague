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
  //homewin
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
      { teamname: team2name },
      {
        goalsFor: losingTeam!.goalsFor + +team2Goals,
        goalsAgainst: losingTeam!.goalsAgainst + +team1Goals,
        matchesLost: losingTeam!.matchesLost + +1,
        goalsDiff: losingTeam!.goalsDiff + +team2Goals - +team1Goals,
      }
    );
  }
  //awaywin
  if (+team1Goals < +team2Goals) {
    const WinningTeam = await TeamModel.findOne({ teamname: team2name });
    const losingTeam = await TeamModel.findOne({ teamname: team1Name });
    const goalDiffUpdate = +WinningTeam!.goalsDiff + +team1Goals - +team2Goals;
    await TeamModel.findOneAndUpdate(
      { teamname: team2name },
      {
        goalsFor: WinningTeam!.goalsFor + +team2Goals,
        points: WinningTeam!.points + +3,
        goalsAgainst: WinningTeam!.goalsAgainst + +team1Goals,
        matchesWon: WinningTeam!.matchesWon + 1,
        goalsDiff: +WinningTeam!.goalsDiff + +team2Goals - +team1Goals,
      }
    );
    const matchesLostUpdate = losingTeam!.matchesLost + +1;
    const losingTeamName = await TeamModel.findOneAndUpdate(
      { teamname: team1Name },
      {
        goalsFor: losingTeam!.goalsFor + +team1Goals,
        goalsAgainst: losingTeam!.goalsAgainst + +team2Goals,
        matchesLost: losingTeam!.matchesLost + +1,
        goalsDiff: losingTeam!.goalsDiff + +team1Goals - +team2Goals,
      }
    );
  }
  // Draw
  if (+team1Goals == +team2Goals) {
    const drawTeam1Hist = await TeamModel.findOne({ teamname: team1Name });
    const drawingTeam1 = await TeamModel.findOneAndUpdate(
      { teamname: team1Name },
      {
        goalsFor: +drawTeam1Hist!.goalsFor + +team1Goals,
        points: +drawTeam1Hist!.points + +1,
        goalsAgainst: +drawTeam1Hist!.goalsAgainst + +team2Goals,
        matchesDrawn: +drawTeam1Hist!.matchesDrawn + 1,
      }
    );
    const drawTeam2Hist = await TeamModel.findOne({ teamname: team2name });
    const drawingTeam2 = await TeamModel.findOneAndUpdate(
      { teamname: team2name },
      {
        goalsFor: +drawTeam2Hist!.goalsFor + +team2Goals,
        points: +drawTeam2Hist!.points + +1,
        goalsAgainst: +drawTeam2Hist!.goalsAgainst + +team1Goals,
        matchesDrawn: +drawTeam2Hist!.matchesDrawn + 1,
      }
    );
  }
}

// matchesLost: { type: Number, default: 0, required: true },
// matchesDrawn: { type: Number, default: 0, required: true },
// goalsFor: { type: Number, default: 0, required: true },
// goalsAgainst: { type: Number, default: 0, required: true },
// goalsDiff: { type: Number, default: 0, required: true }
