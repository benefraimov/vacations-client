import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import Vacation from '../components/Vacation';
import { useSelector } from 'react-redux';

function HomeScreen({ history }) {
    const [vacations, setVacations] = useState([])
    const [flagRender, setFlagRender] = useState(false)

    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        return function cleanUp() {
            setVacations([])
        }
    }, [])

    useEffect(() => {
        if (!(userRedux.userLogin && (userRedux.userLogin === 'USER' || userRedux.userLogin === 'ADMIN'))) {
            history.push('/sign-in')
        }
    }, [history, userRedux])

    useEffect(() => {
        try {
            axios.get("/api/vacations").then(({ data }) => {
                setVacations(data)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }, [flagRender])

    const setFlag = () => {
        setFlagRender(!flagRender)
    }

    return <>
        <Row>
            {vacations && vacations.map((vacation) => (
                <Col key={vacation._id} sm={12} md={6} lg={4} xl={3}>
                    <Vacation callback={setFlag} vacationObject={vacation} />
                </Col>
            ))}
        </Row>
    </>;
}

export default HomeScreen;
