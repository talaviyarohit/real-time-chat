// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from "./components/Navigation";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";



function App() {
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    dueDate: "",
  });
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
       
        <Route path="/create-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
        <Route
            path="/tasks"
            element={
              <>
                <TaskFilter filters={filters} setFilters={setFilters} />
                <TaskList filter={filters} />
              </>
            }
          />
        

      </Routes>
    </Router>
  );
}

export default App;
