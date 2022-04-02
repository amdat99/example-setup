import React from "react";
import FormGroup from "../components/FormGroup";
import { onAddUserData } from "../requests/userRequests";

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

    const callback = () => {
      setFormData(initialForm);
    };
    onAddUserData(formData, callback);
  };

  return (
    <>
      <div className="d-flex p-2 justify-content-center align-items-center mt-5">
        <FormGroup inputs={inputs} formData={formData} setFormData={setFormData} onSubmit={onSubmit} title={"Example form"} />
      </div>
    </>
  );
}

export default FormTest;
