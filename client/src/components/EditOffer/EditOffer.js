import React, { useState, useEffect } from "react";
import { Button, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { useHistory, Link } from "react-router-dom";
import style from "./Edit.module.css";

const EditOffer = (props) => {
  const offerId = props.match.params.offerId;

  const [offer, setOffer] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    db.collection("offers")
      .doc(offerId)
      .get()
      .then((res) => {
        const fetchedOffers = [];
        const fetchedOffer = {
          id: res.id,
          ...res.data(),
        };
        fetchedOffers.push(fetchedOffer);
        setOffer(fetchedOffers);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("offers")
      .doc(offerId)
      .set({
        ...offer,
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <>
      {offer.map((input) => (
        <Form onSubmit={handleSubmit}>
          <Form.Row className={style.row}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" defaultValue={input.companyName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Work Position</Form.Label>
              <Form.Control type="text" value={input.workPosition} />
            </Form.Group>
          </Form.Row>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              className={style.description}
              as="textarea"
              aria-label="With textarea"
              value={input.description}
            />
          </InputGroup>
          <Form.Row className={style.row}>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={input.city} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Working Hours Per Day</Form.Label>
              <Form.Control type="text" value={input.workingHours} />
            </Form.Group>
          </Form.Row>
          <Form.Row className={style.row}>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Required Skills</Form.Label>
              <Form.Control type="text" value={input.reqSkills} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Salary(BGN)</Form.Label>
              <Form.Control type="text" value={input.salary} />
            </Form.Group>
          </Form.Row>

          <Link>
            <Button className={`w-30 ${style.button}`} type="submit">
              Save
            </Button>
          </Link>
        </Form>
      ))}
    </>
  );
};

export default EditOffer;
