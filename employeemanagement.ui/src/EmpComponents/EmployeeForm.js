import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";

function EmployeeForm({ show, onHide, onSubmit, employee, states }) {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    designation: "",
    dateOfJoin: "",
    salary: "",
    gender: "",
    state: "",
    dateOfBirth: "",
  });
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm(employee);
      if (employee.dateOfBirth) calculateAge(employee.dateOfBirth);
    } else {
      setForm({
        id: 0,
        name: "",
        designation: "",
        dateOfJoin: "",
        salary: "",
        gender: "",
        state: "",
        dateOfBirth: "",
      });
      setAge("");
    }
    setErrors({});
  }, [employee, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "dateOfBirth") {
      calculateAge(value);
    }
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }

    setAge(age);
  };


  const handleClear = () => {
    setForm({
      id: 0,
      name: "",
      designation: "",
      dateOfJoin: "",
      salary: "",
      gender: "",
      state: "",
      dateOfBirth: "",
    });
    setAge("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.designation) newErrors.designation = "Designation is required.";
    if (!form.dateOfJoin) newErrors.dateOfJoin = "Date of Join is required.";
    if (!form.salary) newErrors.salary = "Salary is required.";
    else if (isNaN(form.salary) || parseFloat(form.salary) <= 0)
      newErrors.salary = "Salary must be a positive number.";
    if (!form.gender) newErrors.gender = "Gender is required.";
    if (!form.state) newErrors.state = "State is required.";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    // Date validations
    const today = new Date();
    const dob = form.dateOfBirth ? new Date(form.dateOfBirth) : null;
    const doj = form.dateOfJoin ? new Date(form.dateOfJoin) : null;

    if (dob && doj && doj.getTime() === dob.getTime()) {
      newErrors.dateOfJoin = "Date of Join cannot be same as Date of Birth.";
    } else if (dob && doj && doj < dob) {
      newErrors.dateOfJoin = "Date of Join cannot be before Date of Birth.";
    }
    if (dob && age < 0) newErrors.dateOfBirth = "Age cannot be negative.";
    if (doj && doj > today) newErrors.dateOfJoin = "Date of Join cannot be in the future.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form, !!employee);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{employee ? "Edit" : "Add"} Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              isInvalid={!!errors.name}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Designation<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
              isInvalid={!!errors.designation}
            />
            {errors.designation && <div className="text-danger">{errors.designation}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Date Of Join<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="date"
              name="dateOfJoin"
              value={form.dateOfJoin?.substring(0, 10)}
              onChange={handleChange}
              required
              isInvalid={!!errors.dateOfJoin}
            />
            {errors.dateOfJoin && <div className="text-danger">{errors.dateOfJoin}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Salary<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              name="salary"
              type="number"
              step="0.01"
              value={form.salary}
              onChange={handleChange}
              required
              isInvalid={!!errors.salary}
            />
            {errors.salary && <div className="text-danger">{errors.salary}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender<span style={{ color: "red" }}>*</span></Form.Label>
            <div>
              <Form.Check
                inline
                label="Male"
                name="gender"
                type="radio"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
              />
            </div>
            {errors.gender && <div className="text-danger">{errors.gender}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>State<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              isInvalid={!!errors.state}
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
            {errors.state && <div className="text-danger">{errors.state}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Date Of Birth<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth?.substring(0, 10)}
              onChange={handleChange}
              isInvalid={!!errors.dateOfBirth}
            />
            {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control value={age} readOnly />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {employee ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
EmployeeForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    designation: PropTypes.string,
    dateOfJoin: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    state: PropTypes.string,
    dateOfBirth: PropTypes.string,
  }),
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EmployeeForm;