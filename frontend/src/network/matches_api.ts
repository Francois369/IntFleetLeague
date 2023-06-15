import { Match } from "../model/match";

async function fetchData(input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// export async function fetchteams(): Promise<Match[]> {
//   const response = await fetchData("/matches", {
//     method: "GET",
//   });
//   return response.json();
// }

export interface MatchImport {
  teamname1: String;
  teamname2: String;
  team1Goals: Number;
  team2Goals: Number;
}

export async function createMatch(team: MatchImport): Promise<Match> {
  const response = await fetchData("/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  return response.json();
}
