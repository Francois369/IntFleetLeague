import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import matchRoutes from "./routes/matches";
import teamsRoutes from "./routes/teams";

const app = express();

app.use(express.json());

app.use("/matches", matchRoutes);
app.use("/teams", teamsRoutes);
app.use((req, res, next) => {
  next(Error("RouteNot Found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "Unknown Error Occured";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
