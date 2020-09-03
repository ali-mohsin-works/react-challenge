import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import Icon from '../Icon';
import MineralInterest from './mineral-interest';

class EditTractOwnership extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      owner: '',
      interest: '',
      lease: '',
      is_edit: false,
      parrent_edit_id: '',
    };
  }
  render() {
    const {
      handleModal,
      show,
      handleNPRIModal,
      show_npri,
      tractOwnerships,
      addMineralToState,
      removeMineralFromState,
      addNPRIToState,
      removeNPRIFromState,
    } = this.props;

    const toggleModal = async (is_edit, parrent_edit_id) => {
      await this.setState({
        is_edit: is_edit,
        parrent_edit_id: parrent_edit_id,
      });
      if (this.state.is_edit === true) {
        let desiredMineralInterest = tractOwnerships.filter((rec) => {
          if (rec.id === parrent_edit_id) {
            this.setState({
              id: rec.id,
              owner: rec.owner,
              interest: rec.interest,
              lease: rec.lease,
            });
            return true;
          }
        });
      }

      handleModal(!show);
    };

    const setOwner = (e) => this.setState({ owner: e.target.value });
    const setInterest = (e) => this.setState({ interest: e.target.value });
    const setLease = (e) => this.setState({ lease: e.target.value });

    const formSubmit = () => {
      let id = '';
      if (
        this.state.owner !== '' &&
        this.state.interest !== '' &&
        this.state.lease !== ''
      ) {
        if (this.state.parrent_edit_id !== '') {
          id = this.state.parrent_edit_id;
        } else {
          id = uuidv4();
        }

        addMineralToState(
          id,
          this.state.owner,
          this.state.interest,
          this.state.lease,
          this.state.is_edit

        );
        this.setState({ id: '', owner: '', interest: '', lease: '' });
        handleModal(!show);
      } else {
        alert('Please provide Owner name, interest amount and Lease');
      }
    };

    return (
      <Container className="mt-5">
        <Button
          variant="outline-primary"
          onClick={() => toggleModal(false, '')}
        >
          <Icon icon="add" /> Add Mineral Interest
        </Button>

        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {this.state.is_edit
                ? 'Edit Mineral Interest'
                : 'Add Mineral Interest'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="enter owner name"
              value={this.state.owner}
              className="mb-1"
              onChange={setOwner}
            />
            <InputGroup>
              <FormControl
                placeholder="enter mineral interest"
                value={this.state.interest}
                className="mb-1"
                onChange={setInterest}
                type="number"
              />
              <InputGroup.Append className="mb-1">
                <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <FormControl
              placeholder="enter lease"
              value={this.state.lease}
              className="mb-1"
              onChange={setLease}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModal(false, '')}>
              Close
            </Button>
            <Button variant="primary" onClick={formSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col md={3}>Owner</Col>
          <Col md={2}>Mineral Interest</Col>
          <Col md={3}>NPRI</Col>
          <Col md={3}>Lease</Col>
          <Col md={1}></Col>
        </Row>
        <hr />
        <MineralInterest
          mineralInterest={tractOwnerships}
          removeMineralFromState={removeMineralFromState}
          show_npri={show_npri}
          handleNPRIModal={handleNPRIModal}
          addNPRIToState={addNPRIToState}
          removeNPRIFromState={removeNPRIFromState}
          toggleModal={toggleModal}
        />
      </Container>
    );
  }
}

export default EditTractOwnership;
