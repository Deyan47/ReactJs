import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

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

  return (
    <div className="row">
      {error ? <p>Ops, there is an error :(</p> : null}
      {offers.map((offer) => (
        <Card style={{ width: "18rem" }} key={offer.id}>
          <Card.Img variant="top" src={offer.image} />
          <Card.Body>
            <Card.Title>{offer.name}</Card.Title>
            <Card.Text>{offer.description}</Card.Text>
            <Link to="/offers/details/:offerId">
              <Button variant="primary">Learn More...</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Offers;
