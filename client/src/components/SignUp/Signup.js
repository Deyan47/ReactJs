import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import style from "./Signup.module.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [currentOption, setCurrentOption] = useState("user");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const changeOption = (newOption) => {
    setCurrentOption(newOption);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/login");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className={style.cardStyle}>
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <label>Tell us what you are:</label>
            <br />
            <select
              onChange={(event) => changeOption(event.target.value)}
              value={currentOption}
              className={style.select}
            >
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
