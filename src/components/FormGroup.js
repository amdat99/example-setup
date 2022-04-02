import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleChange } from "../helpers/utils";

const FormGroup = ({ inputs, formData, onSubmit, setFormData, title }) => {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    //html validation check
    if (form.checkValidity() === false) {
      return e.stopPropagation();
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
          <Button type="subm+-+it">Submit form</Button>
        </div>
        <Link to="/test">Test</Link>
      </Form>
    </Container>
  );
};

export default FormGroup;
