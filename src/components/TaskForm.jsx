// src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "./Navigation";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get task ID from URL

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        const taskDoc = await doc(db, "tasks", id);
        const taskData = await getDoc(taskDoc);
        setTitle(taskData.data().title);
        setStatus(taskData.data().status);
        setPriority(taskData.data().priority);
        setDueDate(taskData.data().dueDate);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      // Update existing task
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        title,
        status,
        priority,
        dueDate,
      });
    } else {
      // Create new task
      await addDoc(collection(db, "tasks"), {
        title,
        status,
        priority,
        dueDate,
      });
    }

    navigate("/tasks");
  };

  return (
    <>
      <Navigation />
    
    <Container className="mt-5">
      <h2>{id ? "Update Task" : "Create New Task"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="taskTitle" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="taskStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="taskPriority" className="mt-3">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="taskDueDate" className="mt-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          {id ? "Update Task" : "Create Task"}
        </Button>
      </Form>
    </Container>
    </>
  );
};

export default TaskForm;
