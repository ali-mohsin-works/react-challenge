import React from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import Icon from '../Icon';
import NPRI from './npri';

class MineralInterest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      owner: '',
      interest: '',
    };
  }
  render() {
    const {
      mineralInterest,
      removeMineralFromState,
      show_npri,
      handleNPRIModal,
      addNPRIToState,
      removeNPRIFromState,
      toggleModal,
    } = this.props;

    const updateModalCred = async (id, owner, interest) => {
      await this.setState({
        id: id,
        owner: owner,
        interest: interest,
      });
    };

    const toggleEditModal = async (is_edit, parrent_edit_id) => {
      await toggleModal(is_edit, parrent_edit_id);
    };

    const removeMineral = (e) => {
      const r = window.confirm('Do you really want to remove this record?');
      if (r === true) {
        const filteredMineralInterest = mineralInterest.filter(
          (rec) => rec.id !== e.currentTarget.id
        );
        removeMineralFromState(filteredMineralInterest);
      }
    };
    return (
      <Container>
        {mineralInterest.length ? (
          mineralInterest.map((val) => (
            <Row key={val.id}>
              <Col md={12}>
                <Row>
                  <Col md={3}>
                    <FormControl
                      placeholder="enter owner name"
                      value={val.owner}
                      readOnly
                    />
                  </Col>
                  <Col md={2}>
                    <InputGroup>
                      <FormControl
                        placeholder="enter mineral interest"
                        value={val.interest}
                        type="number"
                        readOnly
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  <Col md={3}></Col>
                  <Col md={3}>
                    <FormControl
                      placeholder="enter lease"
                      value={val.lease}
                      readOnly
                    />
                  </Col>
                  <Col md={1}>
                    <span
                      className="ml-1"
                      onClick={() => toggleEditModal(true, val.id)}
                    >
                      <Icon icon="edit" />
                    </span>
                    <span onClick={removeMineral} id={val.id}>
                      <Icon icon="remove" />
                    </span>
                  </Col>
                </Row>
              </Col>
              <NPRI
                parrent_id={val.id}
                npris={val.npris}
                show_npri={show_npri}
                handleNPRIModal={handleNPRIModal}
                addNPRIToState={addNPRIToState}
                id={this.state.id}
                interest={this.state.interest}
                owner={this.state.owner}
                updateModalCred={updateModalCred}
                removeNPRIFromState={removeNPRIFromState}
              />
            </Row>
          ))
        ) : (
          <h2 className="text-danger mt-5 text-center">No Record Found</h2>
        )}
      </Container>
    );
  }
}

export default MineralInterest;
