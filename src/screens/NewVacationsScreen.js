import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Vacation from '../components/Vacation';

function NewVacationsScreen({ history }) {
    const [vacations, setVacations] = useState([])
    const [flagRender, setFlagRender] = useState(false)

    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        return function cleanUp() {
            setVacations([])
        }
    }, [])

    useEffect(() => {
        if (userRedux.userLogin && userRedux.userLogin === 'USER') {
            console.log("user logged in")
        }
        else if (userRedux.userLogin && userRedux.userLogin === 'ADMIN') {
            history.push('/admin')
            console.log("admin logged in")
        } else {
            history.push('/sign-in')
        }
    }, [history, userRedux])

    useEffect(() => {
        try {
            axios.get("/api/vacations").then(({ data }) => {
                const unFollowedVacation = data.filter((vacation) => {
                    if (!(vacation.followers.find(user => user.user === userRedux.userInfo._id))) {
                        return vacation
                    }
                })
                console.log(unFollowedVacation)
                setVacations(unFollowedVacation)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }, [flagRender, userRedux])

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

export default NewVacationsScreen;
