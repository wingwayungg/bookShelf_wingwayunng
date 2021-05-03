import React from "react";

import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

import {LinkContainer} from 'react-router-bootstrap'

// export a navigation component (use react-router-dom)
export default function Navigation() {
    return (
        <Nav variant="tabs" defaultActiveKey="/"
            // activeKey="/"
        >
            <Nav.Item>
                <LinkContainer to="/">
                    <Nav.Link>BOOK LIST</Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item>
                <LinkContainer to="/book">
                    <Nav.Link eventKey="link-1">CREATE BOOK</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    );
}