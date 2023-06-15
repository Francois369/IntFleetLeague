import "bootstrap/dist/css/bootstrap.min.css";
import LeagueTable from "./components/LeagueTable";
import "./App.css";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useState } from "react";
import AddTeamDialog from "./components/AddTeamDialog";
import AddMatchDialog from "./components/AddMatchDialog";

function App() {
  const [showTeamNoteDialog, setshowTeamNoteDialog] = useState(false);
  const [showMatchResultDialog, setshowMatchResultDialog] = useState(false);

  return (
    <Container className="App">
      <Row xs={1} md={2} xl={3} className="g-1">
        <Card style={{ width: "200px" }}>
          <Card.Header>
            <Card.Title>Step: 1</Card.Title>
            <Card.Body style={{ height: 200 }}>
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

        <Card style={{ width: "200px" }}>
          <Card.Header>
            <Card.Title>Step: 2</Card.Title>
            <Card.Body style={{ height: 200 }}>
              <Card.Text>
                Once all the teams are added Schedule the matches
              </Card.Text>
            </Card.Body>
          </Card.Header>
          <Button>Schedule Matches</Button>
        </Card>

        <Card style={{ width: "200px" }}>
          <Card.Header>
            <Card.Title>Step: 3.1</Card.Title>
            <Card.Body style={{ height: 200 }}>
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
