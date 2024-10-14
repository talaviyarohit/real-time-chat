// src/components/Navigation.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar className="bg-nav" expand="lg">
      <Navbar.Brand as={Link} to="/tasks"  className="text-white fs-1">
        Task Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/create-task" className="text-white">
            Create Task
          </Nav.Link>
          <Nav.Link as={Link} to="/tasks" className="text-white">
            Task List
          </Nav.Link>
          
          <Nav.Link as={Link} to="/"  className="text-white" >
            Sing out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
