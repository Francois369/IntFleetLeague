import { Team } from "../model/team";

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

export async function fetchteams(): Promise<Team[]> {
  const response = await fetchData("/teams", {
    method: "GET",
  });
  return response.json();
}

export interface TeamImport {
  teamname?: String;
}

export async function createTeam(team: TeamImport): Promise<Team> {
  const response = await fetchData("/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  return response.json();
}
