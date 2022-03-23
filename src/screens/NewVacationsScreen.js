import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Vacation from '../components/Vacation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function NewVacationsScreen({ socket }) {
    const navigate = useNavigate()
    const [vacations, setVacations] = useState([])
    const [flagRender, setFlagRender] = useState(false)
    const [response, setResponse] = useState("")

    const userRedux = useSelector(({ userReducer }) => userReducer)

    socket.on('got unfollow', (response) => {
        setResponse(response)
        try {
            axios.get("/api/vacations").then(({ data }) => {
                const unFollowedVacation = data.filter((vacation) => {
                    if (!(vacation.followers.find(user => user.user === userRedux.userInfo._id))) {
                        return vacation
                    }
                })
                setVacations(unFollowedVacation)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    })

    socket.on('got follow', (response) => {
        setResponse(response)
        try {
            axios.get("/api/vacations").then(({ data }) => {
                const unFollowedVacation = data.filter((vacation) => {
                    if (!(vacation.followers.find(user => user.user === userRedux.userInfo._id))) {
                        return vacation
                    }
                })
                setVacations(unFollowedVacation)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    })

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
            navigate('/admin')
        } else {
            navigate('/sign-in')
        }
    }, [navigate, userRedux])

    useEffect(() => {
        try {
            axios.get("/api/vacations").then(({ data }) => {
                const unFollowedVacation = data.filter((vacation) => {
                    if (!(vacation.followers.find(user => user.user === userRedux.userInfo._id))) {
                        return vacation
                    }
                })
                setVacations(unFollowedVacation)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }, [flagRender, userRedux])

    const setFlag = (param) => {
        setFlagRender(!flagRender)
        param === "follow" && newFollow()
        param === "unfollow" && newUnFollow()
    }

    const newFollow = async () => {
        socket.emit('follow', "follow")

    }

    const newUnFollow = async () => {
        socket.emit('unfollow', "unfollow")

    }

    return <>
        <Row>
            {vacations && vacations.map((vacation) => (
                <Col key={vacation._id} sm={12} md={6} lg={4} xl={3}>
                    <Vacation
                        callbackFollow={setFlag}
                        callbackUnFollow={setFlag}
                        vacationObject={vacation} />
                </Col>
            ))}
        </Row>
    </>;
}

export default NewVacationsScreen;
