// src/components/TaskFilter.js
import React from "react";
import { Container, Form } from "react-bootstrap";
import Navigation from "./Navigation";

const TaskFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navigation />
      <Container className="mt-5">

    <Form>
      <Form.Group controlId="filterStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="filterPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="filterDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={filters.dueDate}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>

      </Container>
    </>
  );
};

export default TaskFilter;
