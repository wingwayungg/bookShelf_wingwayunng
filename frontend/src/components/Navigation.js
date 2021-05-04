import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { LinkContainer } from "react-router-bootstrap";

// export a navigation component (use react-router-dom)
export default function Navigation() {
  return (
    <Navbar>
      <Nav variant="tabs">
        <LinkContainer to="/list">
          <Nav.Link>Book List</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/book">
          <Nav.Link>Create Book</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}
