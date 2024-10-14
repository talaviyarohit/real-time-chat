// src/components/TaskList.js
import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const TaskList = ({ filter }) => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "tasks"));
                const taskList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(taskList);
            } catch (error) {
                console.error("Error fetching tasks: ", error);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id));
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    return (
        <>

            <Container className="mt-5">

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks
                            .filter((task) => {
                                if (!task || !task.status || !task.priority || !task.dueDate) {
                                    return false;
                                }
                                if (filter.status && filter.status !== "All") {
                                    return task.status === filter.status;
                                }
                                if (filter.priority && filter.priority !== "All") {
                                    return task.priority === filter.priority;
                                }
                                if (filter.dueDate) {
                                    return task.dueDate === filter.dueDate;
                                }
                                return true;
                            })
                            .map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title || "Untitled Task"}</td>
                                    <td>{task.status || "Unknown"}</td>
                                    <td>{task.priority || "Unknown"}</td>
                                    <td>{task.dueDate || "No Due Date"}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => navigate(`/edit-task/${task.id}`)}>
                                            Edit
                                        </Button>{" "}
                                        <Button variant="danger" onClick={() => handleDelete(task.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>

        </>

    );
};

export default TaskList;
