import { useEffect, Fragment, useState } from "react";
import * as TeamApi from "../network/team_api";
import { Team } from "../model/team";
import { fetchteams } from "../network/team_api";

const LeagueTable = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  async function getTeams() {
    try {
      const teamResponse = await TeamApi.fetchteams();
      setTeams(teamResponse);
      return teamResponse;
    } catch (error) {
      alert(error);
    }
  }

  function clickHandler() {
    getTeams();
  }

  if (teams.length > 1) {
    return (
      <Fragment>
        <button onClick={clickHandler}> Refresh League Table </button>
        <p>{JSON.stringify(teams)}</p>
      </Fragment>
    );
  } else {
    return <button onClick={clickHandler}> Refresh League Table </button>;
  }
};

export default LeagueTable;
