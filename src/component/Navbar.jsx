import React from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";


export const Navbar = () => {
  return (
    <BootstrapNavbar
      collapseOnSelect
      expand="lg"
      bg="success"
      variant="dark"
      className="navbar p-2 border shadow"
    >
      <BootstrapNavbar.Brand href="/">
        Health Management System
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BootstrapNavbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link href="/about" className="nav-link">
            About Us
          </Nav.Link>
          <Nav.Link href="/values" className="nav-link">
            Our Values
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

