import { Modal, Form, Button, ModalHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TeamImport, createTeam } from "../network/team_api";
import * as TeamApi from "../network/team_api";
import { Team } from "../model/team";

interface AddTeamDialogProps {
  onDismiss: () => void;
  onTeamSaved: (team: Team) => void;
}

const AddTeamDialog = ({ onDismiss, onTeamSaved }: AddTeamDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamImport>();

  async function onSubmit(input: TeamImport) {
    try {
      const teamResponse = await TeamApi.createTeam(input);
      onTeamSaved(teamResponse);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Team</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addTeamForm" onSubmit={handleSubmit(onSubmit)}></Form>
        <Form.Group>
          <Form.Label></Form.Label>Team Name
        </Form.Group>
        <Form.Control
          type="text"
          placeholder="Team Name"
          {...register("teamname", { required: "required" })}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.teamname?.message}
        </Form.Control.Feedback>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addTeamForm" disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTeamDialog;
