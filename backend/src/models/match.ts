import { Timestamp } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const matchSchema = new Schema(
  {
    teamname1: { type: String },
    teamname2: { type: String },
    team1Goals: { type: Number },
    team2Goals: { type: Number },
  },
  { timestamps: true }
);

type Match = InferSchemaType<typeof matchSchema>;

export default model<Match>("Match", matchSchema);
