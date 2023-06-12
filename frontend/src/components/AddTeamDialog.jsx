import { Modal, Form, Button } from "react-bootstrap";
import { TeamExport, createTeam } from "../network/team_api";
import { Ref, useRef } from "react";
import { click } from "@testing-library/user-event/dist/click";

const AddTeamDialog = ({ onDismiss }) => {
  const teaminput = useRef();

  async function clickHandler(event) {
    event.preventdefault();
    const team = { teamname: `${teaminput.current.value}` };
    let x = await createTeam(team);
    console.log(x);
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Teams</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={clickHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            <Form.Control ref={teaminput} id="team" type="text"></Form.Control>
            <Button type="submit">Submit</Button>
          </Form.Group>
          <Form.Group className="mb-3"></Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
export default AddTeamDialog;
