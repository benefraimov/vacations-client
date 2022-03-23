import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../redux/actions';
import { useNavigate } from 'react-router-dom'

function RegisterScreen() {
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        if (userRedux.userLogin && userRedux.userLogin === 'USER' || userRedux.userLogin === 'ADMIN') {
            navigate('/')
            // console.log("user logged in")
        }
    }, [navigate, userRedux])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(register(user))
        // console.log(user)
        // console.log('registered')
    }

    return <div>
        <form onSubmit={submitForm} className='position-absolute top-50 start-50 translate-middle'>
            <h3 className='text-center p-3 text-capitalize'>Sign Up</h3>
            <div className="form-group">
                <label>Full name</label>
                <input type="text" className="form-control form-control-sm" placeholder="Full name" name="fullname" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control form-control-sm" placeholder="Enter username" name="username" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control form-control-sm" placeholder="Enter password" name="password" onChange={handleChange} />
            </div>
            <div className='d-grid col-8 mx-auto m-3'>
                <button type="submit" className="btn btn-dark text-capitalize">Sign Up</button>
            </div>
            <p className="text-center forgot-password text-light">
                Already registered <Link className='fs-6 text-white' to="/sign-in">sign in?</Link>
            </p>
        </form>
    </div>;
}

export default RegisterScreen;
