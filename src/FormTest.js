import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialForm = { email: "", name: "" };

function FormTest({ setNotifications }) {
  const [formData, setFormData] = React.useState(initialForm);
  const { email } = formData;

  const inputs = [
    { name: "name", label: "Name", helperText: "Name must be 10 characters", errorText: "Should be 10 characters", minLength: 10 },
    { name: "email", label: "Email", type: "email", error: email.length > 20, errorText: "Should be a valid email address and under 20 characters" },
  ];
  const onSubmit = () => {
    setNotifications({ id: Date.now(), message: "Form submitted successfully", title: "Success" });
    requestHandler({ type: "post", route: "/api/users", body: formData }).then((data) => {
      if (data.success) {
        setFormData(initialForm);
      } else {
        handleError(data.errors || "There was an error");
      }
    });
  };

  return (
    <>
      <div className="d-flex p-2 justify-content-center align-items-center mt-5">
        <FormGroup inputs={inputs} formData={formData} setFormData={setFormData} onSubmit={onSubmit} title={"Example form"} />
      </div>
    </>
  );
}


const FormGroup = ({ inputs, formData, onSubmit, setFormData, title }) => {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    //html validation check
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    //custom validation check
    const isValid = inputs.every((input) => input.error !== true);
    if (isValid) {
      setValidated(true);
      onSubmit(e);
    } else {
      e.stopPropagation();
    }
  };
  return (
    <Container className="w-25 p-4 bg-light">
      <h3>{title}</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {inputs.map((input) => {
          if (validated && input.error) setValidated(false);
          return (
            <div key={input.name}>
              <Form.Group md="4" controlId={input.name + "-form-group"}>
                <Form.Label>{input.label}</Form.Label>
                <Form.Control
                  type={input.type || "text"}
                  value={formData[input.name]}
                  name={input.name}
                  visuallyHidden={input.hidden}
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  required={input.required && input.required}
                  minLength={input.minLength && input.minLength}
                  maxLength={input.maxLength && input.maxLength}
                  disabled={input.disabled && input.disabled}
                  step={input.step && input.step}
                  isInvalid={input.error}
                />
                <Form.Control.Feedback type="invalid">{input.errorText}</Form.Control.Feedback>
                {input.hasOwnProperty("helperText") && !validated && <Form.Text className="text-muted">{input.helperText}</Form.Text>}
              </Form.Group>
            </div>
          );
        })}

        <div className="mt-3">
          <Button type="submit">Submit form</Button>
        </div>
        <Link to="/test">Test</Link>
      </Form>
    </Container>
  );
};

export const handleChange = (e, data, setData) => {
  const { name, value } = e.target;
  setData({ ...data, [name]: value });
};

export const handleError = (error) => {
  console.log(error);
};

export const serverUrl = "http://localhost:8080";

export const requestHandler = async ({ url = serverUrl, route, type, body, credentials = "include", contentType = "application/json" }) => {
  try {
    const response = await fetch(url + route, {
      method: type,
      credentials: credentials,
      headers: { "Content-Type": contentType },
      body: body && contentType === "application/json" ? JSON.stringify(body) : body,
    });
    if (response.status === 404) {
      localStorage.removeItem("user_data");
      window.location.reload();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default FormTest;
