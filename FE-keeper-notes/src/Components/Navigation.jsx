import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

/**Resonsive navbar, collapses down to a hamburger menu at the medium breakpoint. I used both Nav.Link and NavLink together
 * as a way to get the active page link to be highlighted automatically.
 */
export default function Navigation() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Keeper Notes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Keepers">
              Keepers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Animals">
              Animals
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Notes">
              Notes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
