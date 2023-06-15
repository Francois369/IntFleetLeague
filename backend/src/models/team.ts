import { Timestamp } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    teamname: { type: String, required: true },
    matchesPlay: { type: Number, default: 0, required: true },
    matchesWon: { type: Number, default: 0, required: true },
    matchesLost: { type: Number, default: 0, required: true },
    matchesDrawn: { type: Number, default: 0, required: true },
    points: { type: Number, default: 0, required: true },
    goalsFor: { type: Number, default: 0, required: true },
    goalsAgainst: { type: Number, default: 0, required: true },
    goalsDiff: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

type Team = InferSchemaType<typeof teamSchema>;

export default model<Team>("Team", teamSchema);
