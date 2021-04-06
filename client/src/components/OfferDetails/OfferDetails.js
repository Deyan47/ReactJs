import React, { useState, useEffect } from "react";
import { Button, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { useHistory, Link } from "react-router-dom";
import style from "./Offer.module.css";

const OfferDetails = (props) => {
  const offerId = props.match.params.offerId;
  const [offer, setOffer] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();

  const deleteOffer = async () => {
    db.collection("offers")
      .doc(offerId)
      .delete()
      .then(() => {
        history.push("/");
      });
  };

  useEffect(() => {
    db.collection("offers")
      .doc(offerId)
      .get()
      .then((response) => {
        const fetchedOffers = [];
        //response.docs.forEach((document) => {
        const fetchedOffer = {
          id: response.id,
          ...response.data(),
        };
        fetchedOffers.push(fetchedOffer);
        // });
        setOffer(fetchedOffers);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      {console.log(offer)}
      {offer.map((input) => (
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={input.companyName}
                disabled="true"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Work Position</Form.Label>
              <Form.Control
                type="text"
                value={input.workPosition}
                disabled="true"
              />
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
              disabled="true"
            />
          </InputGroup>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={input.city} disabled="true" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Working Hours Per Day</Form.Label>
              <Form.Control
                type="text"
                value={input.workingHours}
                disabled="true"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Required Skills</Form.Label>
              <Form.Control
                type="text"
                value={input.reqSkills}
                disabled="true"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Salary(BGN)</Form.Label>
              <Form.Control type="text" value={input.salary} disabled="true" />
            </Form.Group>
          </Form.Row>

          <Link>
            <Button className="w-30" type="submit">
              Apply for the job
            </Button>
          </Link>

          <Link>
            <Button className="w-30" type="submit" onClick={deleteOffer}>
              Delete
            </Button>
          </Link>
        </Form>
      ))}
    </>
  );
};

export default OfferDetails;
