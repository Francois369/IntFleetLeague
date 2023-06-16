import "bootstrap/dist/css/bootstrap.min.css";
import LeagueTable from "./components/LeagueTable";
import "./App.css";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useState } from "react";
import * as TeamApi from "./network/team_api";
import AddTeamDialog from "./components/AddTeamDialog";
import AddMatchDialog from "./components/AddMatchDialog";

function App() {
  const [showTeamNoteDialog, setshowTeamNoteDialog] = useState(false);
  const [showMatchResultDialog, setshowMatchResultDialog] = useState(false);

  async function restartClickHandler() {
    await TeamApi.restartLeague().then(() => {
      alert("League Restarted");
    });
  }

  return (
    <Container className="App">
      <Row xs={1} md={2} xl={3} className="g-1">
        <Card style={{ width: "30%", margin: "1.5%" }}>
          <Card.Header>
            <Card.Title>Step: 1</Card.Title>
            <Card.Body style={{ height: "10%" }}>
              <Card.Text>Add your teams to start the season</Card.Text>
            </Card.Body>
          </Card.Header>
          <Button
            onClick={() => {
              setshowTeamNoteDialog(true);
            }}
          >
            Add Teams
          </Button>
        </Card>

        <Card style={{ width: "30%", margin: "1.5%" }}>
          <Card.Header>
            <Card.Title>Step: 2</Card.Title>
            <Card.Body style={{ height: "10%" }}>
              <Card.Text>Capture matches</Card.Text>
            </Card.Body>
          </Card.Header>
          <Button
            onClick={() => {
              setshowMatchResultDialog(true);
            }}
          >
            Capture Results
          </Button>
        </Card>

        <Card style={{ width: "30%", margin: "1.5%" }}>
          <Card.Header>
            <Card.Title>Step: 3</Card.Title>
            <Card.Body style={{ height: "10%" }}>
              <Card.Text>Reset League</Card.Text>
            </Card.Body>
          </Card.Header>
          <Button onClick={restartClickHandler} variant="danger">
            Restart
          </Button>
        </Card>
      </Row>
      <Row>
        <LeagueTable />
      </Row>
      {showTeamNoteDialog && (
        <AddTeamDialog
          onTeamSaved={() => {
            setshowTeamNoteDialog(false);
          }}
          onDismiss={() => setshowTeamNoteDialog(false)}
        />
      )}
      {showMatchResultDialog && (
        <AddMatchDialog
          onMatchSaved={() => {
            setshowMatchResultDialog(false);
          }}
          onDismiss={() => setshowMatchResultDialog(false)}
        />
      )}
    </Container>
  );
}

export default App;
