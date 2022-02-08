import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Vacation from '../components/Vacation';
import { useSelector } from 'react-redux';

function AdminScreen({ history }) {
    const [vacations, setVacations] = useState([])
    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        if (userRedux.userLogin && userRedux.userLogin === 'USER') {
            console.log("user logged in")
            history.push('/')
        }
        else if (userRedux.userLogin && userRedux.userLogin === 'ADMIN') {
            console.log("admin logged in")
        } else {
            history.push('/sign-in')
        }
    }, [history, userRedux])

    useEffect(() => {
        axios.get("http://localhost:4000/api/vacations").then(({ data }) => {
            setVacations(data)
        }).catch(err => console.log(err))
        return function cleanUp() {
            setVacations([])
        }
    }, [])

    const vacationRepeater = vacations.map((vacation) => {
        return <Vacation key={vacation._id} vacationObject={vacation} />
    })

    return <div>
        Admin Screen
        {vacationRepeater}
    </div>;
}

export default AdminScreen;
