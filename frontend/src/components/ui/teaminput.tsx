import { useEffect, useState } from "react";
import { fetchteams } from "../../network/team_api";
import { Team } from "../../model/team";
import { Form } from "react-bootstrap";

const TeamInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(() => {
    setIsLoading(true);
    fetchteams()
      .then((response) => {
        setTeams(response);
      })
      .finally(() => setIsLoading(false));
  }, []);

  console.log(teams);
  if (!isLoading) {
    return (
      <Form.Select aria-label="Default select example">
        <option>Teams</option>
        {teams.map((item) => (
          <option value={item.teamname}>{item.teamname}</option>
        ))}
      </Form.Select>
    );
  } else {
    return <Form.Select></Form.Select>;
  }
};

export default TeamInput;
