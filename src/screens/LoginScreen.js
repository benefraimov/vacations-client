import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions'

function LoginScreen({ history }) {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        if (userRedux.userLogin && userRedux.userLogin === "USER" || userRedux.userLogin === "ADMIN") {
            history.push('/')
        }
    }, [history, userRedux])

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })
    }

    const submitForm = (e) => {
        e.preventDefault()
        console.log(user)
        dispatch(login(user))
        console.log(userRedux.userLogin)
    }

    return <>
        <form onSubmit={submitForm} className='position-absolute top-50 start-50 translate-middle'>
            <h3 className='text-center p-3'>Sign In</h3>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" name="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} />
            </div>
            <div className='d-grid col-6 mx-auto m-3'>
                <button type="submit" className="btn btn-dark">Submit</button>
            </div>
        </form><br />
    </>;
}

export default LoginScreen;
