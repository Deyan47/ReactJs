import React, { useState, useEffect } from "react";
import { Button, Form, Col, InputGroup, FormControl } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { useHistory, Link } from "react-router-dom";
import style from "./Offer.module.css";
import { useAuth } from "../../contexts/AuthContext";

const OfferDetails = (props) => {
  const offerId = props.match.params.offerId;
  const [offer, setOffer] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { getUserData } = useAuth();

  useEffect(() => {
    db.collection("offers")
      .doc(offerId)
      .get()
      .then((res) => {
        const actualOfferData = res.data();
        const userIndex = actualOfferData.clients.indexOf(getUserData().uid);
        const imInTheClientsList = userIndex > -1;
        const imTheSalesman = actualOfferData.salesman === getUserData().uid;
        const fetchedOffers = [];
        const fetchedOffer = {
          imTheSalesman,
          imInTheClientsList,
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

  const saveOffer = async () => {
    db.collection("saved")
      .add(...offer)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError(error);
      });
  };

  const deleteOffer = async () => {
    db.collection("offers")
      .doc(offerId)
      .delete()
      .then(() => {
        history.push("/offers");
      })
      .catch(() => {
        setError(error);
      });
  };

  return (
    <>
      {offer.map((input) => (
        <Form>
          <Form.Row className={style.row}>
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
          <Form.Row className={style.row}>
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
          <Form.Row className={style.row}>
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

          {input.imTheSalesman === true ? (
            <Link>
              <Button
                className={`w-30 ${style.button}`}
                type="submit"
                onClick={deleteOffer}
              >
                Delete
              </Button>
            </Link>
          ) : (
            <Link>
              <Button
                className={`w-30 ${style.button}`}
                type="submit"
                onClick={saveOffer}
              >
                Save this offer in dashboard
              </Button>
            </Link>
          )}
        </Form>
      ))}
    </>
  );
};

export default OfferDetails;
