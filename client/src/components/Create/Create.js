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
    if (e.target.value.length < 10) {
      setError("Description must be at least 10 symbols.");
    } else {
      setError("");
    }
  };

  const onReqSkillsChangeHandler = (e) => {
    if (e.target.value.length < 4) {
      setError("Required skills must be at least 4 symbols.");
    } else {
      setError("");
    }
  };

  const onWorkPositionChangeHandler = (e) => {
    const regEx = /^\D+$/g;
    if (e.target.value.length < 4) {
      setError("Work position must be at least 4 symbols.");
    } else if (e.target.value.length > 15) {
      setError("Work position max length allowed is 15 symbols.");
    } else if (!e.target.value.match(regEx)) {
      setError("Work position must include letters only.");
    } else {
      setError("");
    }
  };

  const onNameChangeHandler = (e) => {
    if (e.target.value.length < 3) {
      setError("Company name must be at least 3 symbols.");
    } else if (e.target.value.length > 20) {
      setError("Company name max length allowed is 20 symbols.");
    } else {
      setError("");
    }
  };

  const onCityChangeHandler = (e) => {
    const regEx = /^\D+$/g;
    if (e.target.value.length < 4) {
      setError("City must be at least 3 symbols.");
    } else if (e.target.value.length > 15) {
      setError("City max length allowed is 15 symbols.");
    } else if (!e.target.value.match(regEx)) {
      setError("City must include letters only.");
    } else {
      setError("");
    }
  };

  const onHoursChangeHandler = (e) => {
    const regEx = /^\d+$/g;
    if (e.target.value.length < 1) {
      setError("Working hours must be at least 1 symbols.");
    } else if (e.target.value.length > 3) {
      setError("Working hours max length allowed is 3 symbols.");
    } else if (!e.target.value.match(regEx)) {
      setError("Working hours must include digits only.");
    } else {
      setError("");
    }
  };

  const onSalaryChangeHandler = (e) => {
    const regEx = /^\d+$/g;
    if (e.target.value.length < 3) {
      setError("Salary must be at least 3 symbols.");
    } else if (e.target.value.length > 15) {
      setError("Salary max length allowed is 15 symbols.");
    } else if (!e.target.value.match(regEx)) {
      setError("Salary must include digits only.");
    } else {
      setError("");
    }
  };

  const onImageHandler = (e) => {
    const regEx = /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/g;
    if (!e.target.value.match(regEx)) {
      setError("Not a valid image address.");
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
        history.push("/offers");
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
            onBlur={onNameChangeHandler}
            required="true"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Work Position</Form.Label>
          <Form.Control
            type="text"
            value={workPosition}
            onChange={(e) => setWorkPosition(e.target.value)}
            onBlur={onWorkPositionChangeHandler}
            required="true"
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
          required="true"
        />
      </InputGroup>

      <Form.Row className={style.row}>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required="true"
            onBlur={onCityChangeHandler}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Working Hours Per Day</Form.Label>
          <Form.Control
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            onBlur={onHoursChangeHandler}
            required="true"
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
            onBlur={onReqSkillsChangeHandler}
            required="true"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Salary(BGN)</Form.Label>
          <Form.Control
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            onBlur={onSalaryChangeHandler}
            required="true"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Image Adress</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            onBlur={onImageHandler}
            required="true"
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
