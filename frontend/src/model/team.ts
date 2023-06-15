export interface Team {
  _id: string;
  teamname: string;
  matchesPlay: { type: Number; default: 0 };
  matchesWon: { type: Number; default: 0 };
  matchesLost: { type: Number; default: 0 };
  matchesDrawn: { type: Number; default: 0 };
  points: { type: Number; default: 0 };
  goalsFor: { type: Number; default: 0 };
  goalsAgainst: { type: Number; default: 0 };
  goalsDiff: { type: Number; default: 0 };
  createdAt: string;
  updatedAt: string;
}
