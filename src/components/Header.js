import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../redux/actions';

function Header() {
    const [user, setUser] = useState()
    const dispatch = useDispatch()
    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        if (userRedux.userLogin && (userRedux.userLogin === "USER" || userRedux.userLogin === "ADMIN"))
            setUser(userRedux.userInfo.fullname)
        else
            setUser()
    }, [user, userRedux])

    const signOut = () => {
        console.log("signed out")
        dispatch(logout())
    }

    return <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to={`/`}><Navbar.Brand className='text-capitalize'>Obser Vacation</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    {
                        (userRedux.userInfo
                            &&
                            userRedux.userInfo.isAdmin)
                            ?
                            <Nav className='me-auto'>
                                <LinkContainer to={`/admin/addvacation`}>
                                    <Nav.Link className='text-capitalize'>Add Vacation</Nav.Link></LinkContainer>
                                <LinkContainer to={`/admin/reports`}>
                                    <Nav.Link className='text-capitalize'>Reports</Nav.Link></LinkContainer>
                            </Nav>
                            :
                            (user
                                &&
                                <Nav className='me-auto'>
                                    <LinkContainer to={`/follow`}>
                                        <Nav.Link className='text-capitalize'>Following</Nav.Link></LinkContainer>
                                    <LinkContainer to={`/explore`}><Nav.Link className='text-capitalize'>Explore Vacations</Nav.Link></LinkContainer>
                                </Nav>)
                    }
                    {
                        !user ?
                            <Nav className="ms-auto ">
                                <LinkContainer to={`/sign-in`}><Nav.Link className='text-capitalize'>Sign In</Nav.Link></LinkContainer>
                                <LinkContainer to={`/sign-up`}><Nav.Link className='text-capitalize'>Sign Up</Nav.Link></LinkContainer>
                            </Nav>
                            :
                            <Nav className='ms-auto'>
                                <Nav.Link disabled active className='text-capitalize'>
                                    {`Hello ${user}`}
                                </Nav.Link>
                                <Nav.Link onClick={signOut} className='text-capitalize'>Sign Out</Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default Header;
