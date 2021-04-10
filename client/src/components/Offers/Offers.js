import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import style from "./Offers.module.css";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    db.collection("offers")
      .get()
      .then((response) => {
        const fetchedOffers = [];
        response.docs.forEach((document) => {
          const fetchedOffer = {
            id: document.id,
            ...document.data(),
          };
          fetchedOffers.push(fetchedOffer);
        });
        setOffers(fetchedOffers);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (offers.length < 1) {
    return <h1>No Offers for now.</h1>;
  }

  return (
    <div className={`row ${style.styleRow}`}>
      {error ? <p>Ops, there is an error :(</p> : null}
      {offers.map((offer) => (
        <Card style={{ width: "18rem", marginLeft: "15px" }} key={offer.id}>
          <Card.Img variant="top" src={offer.image} />
          <Card.Body>
            <Card.Title>{offer.companyName}</Card.Title>
            <Card.Text>{offer.workPosition}</Card.Text>
            <Link to={`/offers/details/${offer.id}`}>
              <Button variant="primary">Learn More..</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Offers;
