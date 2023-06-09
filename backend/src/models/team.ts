import { Timestamp } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    teamname: { type: String, required: true },
  },
  { timestamps: true }
);

type Team = InferSchemaType<typeof teamSchema>;

export default model<Team>("Team", teamSchema);
