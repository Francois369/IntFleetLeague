import { useEffect, Fragment, useState } from "react";
import Table from "react-bootstrap/Table";
import * as TeamApi from "../network/team_api";
import { Team } from "../model/team";
import { fetchteams } from "../network/team_api";
import { Button, Card, Container, Row } from "react-bootstrap";

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
    var display: Team[] = teams;
    display.sort();
    display.sort(function (a, b) {
      return +a.points - +b.points;
    });
    display.reverse();
    return (
      <Fragment>
        <Button variant="warning" onClick={clickHandler}>
          Refresh League Table
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Points</th>
              <th>Games Won</th>
              <th>Games Lost</th>
              <th>Games Drawn</th>
              <th>Goal Difrence</th>
              <th>Goals for</th>
            </tr>
          </thead>
          <tbody>
            {display.map((item: Team) => (
              <tr key={item.teamname}>
                <td>{item.teamname}</td>
                <td>{`${item.points}`}</td>
                <td>{`${item.matchesWon}`}</td>
                <td>{`${item.matchesLost}`}</td>
                <td>{`${item.matchesDrawn}`}</td>
                <td>{`${item.goalsDiff}`}</td>
                <td>{`${item.goalsFor}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
  } else {
    return (
      <Button variant="warning" onClick={clickHandler}>
        Refresh League Table{" "}
      </Button>
    );
  }
};

export default LeagueTable;
