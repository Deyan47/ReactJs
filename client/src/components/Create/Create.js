import React, { useState } from "react";
import { Button, Form, Col, Alert } from "react-bootstrap";
import { db } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";

const CreateOffer = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [workPosition, setWorkPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [city, setCity] = useState("");
  const [reqSkills, setReqSkills] = useState("");

  const [error, setError] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onDescriptionChangeHandler = (e) => {
    console.log(e.target.value);

    if (e.target.value.length < 10) {
      setError("Description too short");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    db.collection("offers")
      .add({
        companyName: companyName,
        description: description,
        image: image,
        workPosition: workPosition,
        salary: salary,
        workingHours: workingHours,
        city: city,
        reqSkills: reqSkills,
      })
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    setCompanyName("");
    setDescription("");
    setImage("");
    setWorkPosition("");
    setSalary("");
    setWorkingHours("");
    setCity("");
    setReqSkills("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Work Position</Form.Label>
          <Form.Control
            type="text"
            value={workPosition}
            onChange={(e) => setWorkPosition(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>Description About the Job</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={onDescriptionChangeHandler}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Working Hours Per Day</Form.Label>
          <Form.Control
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Required Skills</Form.Label>
          <Form.Control
            type="text"
            value={reqSkills}
            onChange={(e) => setReqSkills(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Image Adress</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Button disabled={loading} className="w-100" type="submit">
        Create Offer!
      </Button>
    </Form>
  );
};

export default CreateOffer;
