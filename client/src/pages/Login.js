import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
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

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { confirmPassword: _, ...registerValues } = values;
      const { data } = await axios.post(loginRoute, registerValues);
      if (data.status === false) {
        toast.error(data["message"], toastErrorOptions);
      } else {
        toast.success("Successfully logged in", toastSuccessOptions);
        localStorage.setItem("chat-user", JSON.stringify(values.username));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;
    let status = true;

    // Validate username
    if (username.length < 3 || username.length > 20) {
      toast.error(
        "Username length must be between 3 and 20.",
        toastErrorOptions
      );
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
          <h2 className="text-center mb-4">Login</h2>
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

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
      <p>{localStorage.getItem("chat-user")}</p>
    </div>
  );
};

export default Login;
