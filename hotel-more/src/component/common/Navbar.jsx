import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink as ReactstrapNavLink } from 'reactstrap';
import ApiService from "../../service/ApiService";
import { useState } from "react";

function NavBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();

    const handleLogout = () => {
        const isLogOut = window.confirm("Click on Ok to logout");
        if (isLogOut) {
            ApiService.logout();
            navigate("/");
        }
    }

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>
                <NavLink to="/" className="navbar-brand">Hotel More</NavLink>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto navbar-ul" navbar>
                    <NavItem>
                        <ReactstrapNavLink tag={NavLink} to="/" activeclass="active">Home</ReactstrapNavLink>
                    </NavItem>
                    <NavItem>
                        <ReactstrapNavLink tag={NavLink} to="/rooms" activeclass="active">Room</ReactstrapNavLink>
                    </NavItem>
                    <NavItem>
                        <ReactstrapNavLink tag={NavLink} to="/find-booking" activeclass="active">Find My Booking</ReactstrapNavLink>
                    </NavItem>
                    {isUser && (
                        <NavItem>
                            <ReactstrapNavLink tag={NavLink} to="/profile" activeclass="active">Profile</ReactstrapNavLink>
                        </NavItem>
                    )}
                    {isAdmin && (
                        <NavItem>
                            <ReactstrapNavLink tag={NavLink} to="/admin" activeclass="active">Admin</ReactstrapNavLink>
                        </NavItem>
                    )}
                    {!isAuthenticated && (
                        <>
                            <NavItem>
                                <ReactstrapNavLink tag={NavLink} to="/login" activeclass="active">Login</ReactstrapNavLink>
                            </NavItem>
                            <NavItem>
                                <ReactstrapNavLink tag={NavLink} to="/register" activeclass="active">Register</ReactstrapNavLink>
                            </NavItem>
                        </>
                    )}
                    {isAuthenticated && (
                        <NavItem>
                            <ReactstrapNavLink onClick={handleLogout}>Logout</ReactstrapNavLink>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>

    )
}

export default NavBar;