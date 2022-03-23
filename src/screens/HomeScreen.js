import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import Vacation from '../components/Vacation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
// useLocation - to get the path,
// useNavigate - replace the history and the go back,
// useParams - replace the match
function HomeScreen({ socket }) {
    const navigate = useNavigate()
    const [vacations, setVacations] = useState([])
    const [flagRender, setFlagRender] = useState(false)
    const [response, setResponse] = useState("")

    const userRedux = useSelector(({ userReducer }) => userReducer)

    socket.on('got unfollow', (response) => {
        setResponse(response)
        try {
            axios.get("/api/vacations").then(({ data }) => {
                setVacations(data)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    })

    socket.on('got follow', (response) => {
        setResponse(response)
        try {
            axios.get("/api/vacations").then(({ data }) => {
                setVacations(data)
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
        if (!(userRedux.userLogin && (userRedux.userLogin === 'USER' || userRedux.userLogin === 'ADMIN'))) {
            navigate('/sign-in')
        }
    }, [navigate, userRedux])

    useEffect(() => {
        try {
            axios.get("/api/vacations").then(({ data }) => {
                setVacations(data)
            }).catch(err => { throw new Error(err) })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }

    }, [flagRender])

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
                        vacationObject={vacation}
                    />
                </Col>
            ))}
        </Row>
    </>;
}

export default HomeScreen;
