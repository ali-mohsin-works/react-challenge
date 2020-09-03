import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import EditTractOwnership from './EditTractOwnership';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tractOwnerships: [
        {
          id: uuidv4(),
          owner: 'Luke Skywalker',
          interest: 0.5,
          lease: 'Tatooine Lease',
          npris: [
            {
              id: uuidv4(),
              owner: 'Leia Organa',
              interest: 0.45,
            },
            {
              id: uuidv4(),
              owner: 'Han Solo',
              interest: 0.15,
            },
          ],
        },
      ],
      parrent_id: '',
      child_id: '',
      show: false,
      show_npri: false,
    };
  }

  render() {
    const { tractOwnerships, show, show_npri } = this.state;

    const handleModal = async (value) => {
      await this.setState({ show: value });
    };

    const handleNPRIModal = async (value, id, child_id) => {
      await this.setState({
        show_npri: value,
        parrent_id: id,
        child_id: child_id,
      });
    };

    const addMineralToState = (id, owner, interest, lease, is_edit) => {
      if (is_edit === true) {
        let m;
        let filteredMineralInterest;
        let temp = [...this.state.tractOwnerships];
        let desiredMineralInterest = temp.filter((rec, i) => {
          if (rec.id === id) {
            m = i;
            return true;
          } else {
            return false;
          }
        });

        filteredMineralInterest = {
          ...desiredMineralInterest[0],
          owner,
          interest,
          lease,
        };
        temp[m] = filteredMineralInterest;
        this.setState({
          tractOwnerships: temp,
        });
      } else {
        this.setState({
          tractOwnerships: [
            ...tractOwnerships,
            {
              id: id,
              owner: owner,
              interest: interest,
              lease: lease,
              npris: [],
            },
          ],
        });
      }
    };

    const removeMineralFromState = (data) => {
      this.setState({
        tractOwnerships: data,
      });
    };
    const addNPRIToState = (id, owner, interest, is_edit) => {
      let m;
      let n;
      let filteredNPRIs;
      let desiredNPRI;
      let NPRI;
      let temp = [...this.state.tractOwnerships];
      if (is_edit === true) {
        let desiredMineralInterest = temp.filter((rec, i) => {
          if (rec.id === this.state.parrent_id) {
            m = i;
            return true;
          } else {
            return false;
          }
        });

        filteredNPRIs = [...desiredMineralInterest[0].npris];

        desiredNPRI = filteredNPRIs.filter((rec, i) => {
          if (rec.id ===  this.state.child_id) {
            n = i;
            return true;
          } else {
            return false;
          }
        });

        NPRI = {
          ...desiredNPRI[0],
          owner,
          interest,
        };

        filteredNPRIs[n] = NPRI;

        desiredMineralInterest[0].npris = filteredNPRIs;
        temp[m] = { ...desiredMineralInterest[0] };
        this.setState({
          tractOwnerships: temp,
        });
      } else {
        let desiredMineralInterest = temp.filter((rec, i) => {
          if (rec.id === this.state.parrent_id) {
            m = i;
            return true;
          } else {
            return false;
          }
        });

        filteredNPRIs = [...desiredMineralInterest[0].npris];
        filteredNPRIs.push({ id: id, owner: owner, interest: interest });

        desiredMineralInterest[0].npris = filteredNPRIs;
        temp[m] = { ...desiredMineralInterest[0] };
        this.setState({
          tractOwnerships: temp,
        });
      }
    };

    const removeNPRIFromState = (parrent_id, child_id) => {
      let m;
      let filteredNPRIs;

      let temp = [...this.state.tractOwnerships];
      let desiredMineralInterest = temp.filter((rec, i) => {
        if (rec.id === parrent_id) {
          m = i;
          return true;
        }
      });

      filteredNPRIs = desiredMineralInterest[0].npris.filter(
        (npri) => npri.id !== child_id
      );
      desiredMineralInterest[0].npris = filteredNPRIs;
      temp[m] = { ...desiredMineralInterest[0] };
      this.setState({
        tractOwnerships: temp,
      });
      return true;
    };

    return (
      <Container>
        <Row>
          <Col>
            <EditTractOwnership
              tractOwnerships={tractOwnerships}
              handleModal={handleModal}
              show={show}
              handleNPRIModal={handleNPRIModal}
              show_npri={show_npri}
              addMineralToState={addMineralToState}
              removeMineralFromState={removeMineralFromState}
              addNPRIToState={addNPRIToState}
              removeNPRIFromState={removeNPRIFromState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
