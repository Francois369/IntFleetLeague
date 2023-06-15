import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MatchImport, createMatch } from "../network/matches_api";
import * as MatchApi from "../network/matches_api";
import { Match } from "../model/match";
import { Team } from "../model/team";

import { fetchteams } from "../network/team_api";

interface AddMatchResultDialogProps {
  onDismiss: () => void;
  onMatchSaved: (match: Match) => void;
}

const AddMatchDialog = ({
  onDismiss,
  onMatchSaved,
}: AddMatchResultDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MatchImport>();

  async function onSubmit(input: MatchImport) {
    try {
      const matchResponse = await MatchApi.createMatch(input);
      onMatchSaved(matchResponse);
    } catch (error) {
      alert(error);
    }
  }

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

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Match Result</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addMatchForm" onSubmit={handleSubmit(onSubmit)}></Form>
        <Form.Group>
          <Form.Label>Home Team</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("teamname1", { required: "required" })}
          >
            <option>...</option>
            {teams.map((item: any) => (
              <option value={item.teamname}>{item.teamname}</option>
            ))}
          </Form.Select>
          <Form.Label></Form.Label>Home Team Score
          <Form.Control
            type="text"
            placeholder="0"
            {...register("team1Goals", { required: "required" })}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Away Team</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("teamname2", { required: "required" })}
          >
            <option>...</option>
            {teams.map((item: any) => (
              <option value={item.teamname}>{item.teamname}</option>
            ))}
          </Form.Select>
          <Form.Label></Form.Label>Away Team Score
          <Form.Control
            type="text"
            placeholder="0"
            {...register("team2Goals", { required: "required" })}
          ></Form.Control>
        </Form.Group>

        {/* <Form.Control.Feedback type="invalid">
          {errors.teamname?.message}
        </Form.Control.Feedback> */}
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addMatchForm" disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMatchDialog;
