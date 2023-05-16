import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastErrorOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const toastSuccessOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { confirmPassword: _, ...registerValues } = values;
      const { data } = await axios.post(registerRoute, registerValues);
      if (data.status === false) {
        toast.error(data["message"], toastErrorOptions);
      } else {
        toast.success("User created successfully", toastSuccessOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    let status = true;

    // Validate username
    if (username.length < 3 || username.length > 20) {
      toast.error(
        "Username length must be between 3 and 20.",
        toastErrorOptions
      );
      status = false;
    }

    // Validate email
    if (email.length > 50) {
      toast.error("Email length must be least than 50", toastErrorOptions);
      status = false;
    }

    // Validate password
    if (password !== confirmPassword) {
      toast.error("Passwords must match.", toastErrorOptions);
      status = false;
    }
    if (password.length < 8) {
      toast.error("Password length must be at least 8.");
      status = false;
    }

    return status;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <Card className="m-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Register;
