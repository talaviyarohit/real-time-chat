// src/components/UserDashboard.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navigation from "./Navigation";


const UserDashboard = () => {


  return (
   <>
      <Navigation />

    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Your Tasks</Card.Title>
              <Card.Text>List of tasks assigned to the user.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Activities</Card.Title>
              <Card.Text>Overview of your recent activities.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
   
   </>

  );
};

export default UserDashboard;
