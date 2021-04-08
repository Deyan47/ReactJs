import React, { useState } from "react";
import {
  Button,
  Form,
  Col,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import style from "./Create.module.css";
import { db } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CreateOffer = () => {
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [workPosition, setWorkPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [city, setCity] = useState("");
  const [reqSkills, setReqSkills] = useState("");
  const { getUserData } = useAuth();

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
        salesman: getUserData().uid,
        clients: [],
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
      <Form.Row className={style.row}>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Work Position</Form.Label>
          <Form.Control
            type="text"
            value={workPosition}
            onChange={(e) => setWorkPosition(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>

      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text>Description About the Job</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className={style.description}
          as="textarea"
          aria-label="With textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={onDescriptionChangeHandler}
          required
        />
      </InputGroup>

      <Form.Row className={style.row}>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Working Hours Per Day</Form.Label>
          <Form.Control
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>

      <Form.Row className={style.row}>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Required Skills</Form.Label>
          <Form.Control
            type="text"
            value={reqSkills}
            onChange={(e) => setReqSkills(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Salary(BGN)</Form.Label>
          <Form.Control
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Image Adress</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
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
