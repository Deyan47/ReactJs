import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { db } from "../../firebase/firebase";

import style from "./Dashboard.module.css";

const Dashboard = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    db.collection("saved")
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

  if (Object.keys(offers).length < 1) {
    return <h1>No Saved Offers</h1>;
  }

  return (
    <div className={`row ${style.styleRow}`}>
      {error ? <p>Ops, there is an error :(</p> : null}
      {Object.keys(offers).map((offer, i) => (
        <Card
          style={{ width: "18rem", marginLeft: "15px" }}
          key={offers[offer].id}
        >
          {console.log(offers[i])}
          <Card.Img variant="top" src={offers[offer].image} />
          <Card.Body>
            <Card.Title>{offers[offer].companyName}</Card.Title>
            <Card.Text>{offers[offer].workPosition}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
