import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import Icon from '../Icon';

class NPRI extends React.Component {
  constructor() {
    super();
    this.state = {
      is_edit: false,
      parrent_edit_id: '',
      child_edit_id: '',
    };
  }

  render() {
    const {
      npris,
      show_npri,
      handleNPRIModal,
      addNPRIToState,
      removeNPRIFromState,
      parrent_id,
      updateModalCred,
      id,
      interest,
      owner,
    } = this.props;

    const toggleModalNPRI = async (is_edit, parrent_edit_id, child_edit_id) => {
      await this.setState({
        is_edit: is_edit,
        parrent_edit_id: parrent_edit_id,
        child_edit_id: child_edit_id,
      });
      debugger;
      if (this.state.is_edit === true) {
        let desiredNPRI = npris.filter(async (rec) => {
          if (rec.id === child_edit_id) {
            updateModalCred(rec.id, rec.owner, rec.interest);
            return true;
          }
        });
      }
      handleNPRIModal(!show_npri, parrent_edit_id, child_edit_id);
    };

    const removeNPRI = (e) => {
      const r = window.confirm('Do you really want to remove this record?');
      if (r === true) {
        removeNPRIFromState(e.currentTarget.title, e.currentTarget.id);
      }
    };

    const formSubmit = () => {
      let idd = '';
      if (this.state.owner !== '' && this.state.interest !== '') {
        if (this.state.child_edit_id !== '') {
          idd = this.state.child_edit_id;
        } else {
          idd = uuidv4();
        }
        addNPRIToState(idd, owner, interest, this.state.is_edit);
        updateModalCred('', '', '');
        handleNPRIModal(!show_npri, '', '');
      } else {
        alert('Please provide Owner name and interest amount');
      }
    };
    return (
      <Container>
        {
          <div>
            <Modal
              show={show_npri}
              onHide={() => toggleModalNPRI(false, '', '')}
            >
              <Modal.Header>
                <Modal.Title>
                  {this.state.is_edit
                    ? 'Edit NPRI Interest'
                    : 'Add NPRI Interest'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormControl
                  placeholder="enter owner name"
                  value={owner}
                  className="mb-1"
                  onChange={(e) => {
                    updateModalCred(id, e.target.value, interest);
                  }}
                />
                <InputGroup>
                  <FormControl
                    placeholder="enter mineral interest"
                    value={interest}
                    className="mb-1"
                    onChange={(e) => {
                      updateModalCred(id, owner, e.target.value);
                    }}
                    type="number"
                  />
                  <InputGroup.Append className="mb-1">
                    <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => toggleModalNPRI(false, '', '')}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={formSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <Col md={12}>
              {npris.length ? (
                npris.map((npri) => (
                  <Row className="mt-2" key={npri.id}>
                    <Col md={1} className="ml-5 text-right">
                      <Icon icon="indent" />
                    </Col>
                    <Col md={3}>
                      <FormControl
                        placeholder="enter owner name"
                        value={npri.owner}
                        readOnly
                      />
                    </Col>
                    <Col md={3}>
                      <InputGroup>
                        <FormControl
                          placeholder="enter interest"
                          value={npri.interest}
                          type="number"
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col md={1} className="text-left">
                      <span
                        className="ml-1"
                        onClick={() =>
                          toggleModalNPRI(true, parrent_id, npri.id)
                        }
                      >
                        <Icon icon="edit" />
                      </span>
                      <span
                        onClick={removeNPRI}
                        id={npri.id}
                        title={parrent_id}
                      >
                        <Icon icon="remove" />
                      </span>
                    </Col>
                  </Row>
                ))
              ) : (
                <h3 className="text-danger mt-5 text-center">No NPRIs Found</h3>
              )}
            </Col>

            <Col md={12} className="mb-5">
              <Button
                variant="outline-primary"
                onClick={() => toggleModalNPRI(false, parrent_id, '')}
              >
                <Icon icon="add" /> Add NPRI
              </Button>
            </Col>
          </div>
        }
      </Container>
    );
  }
}

export default NPRI;
