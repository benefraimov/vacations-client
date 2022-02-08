import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVacation } from '../redux/actions';

function AddVacation({ history }) {
    const [vacation, setVacation] = useState({})
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        setMessage("")
        setVacation({})
        if (userRedux.userLogin && userRedux.userLogin === 'USER' || userRedux.userLogin === 'ADMIN') {
        } else {
            history.push('/sign-in')
        }
    }, [history, userRedux])

    const handleChange = (e) => {
        const { name, value } = e.target
        setVacation({ ...vacation, [name]: value })
        setMessage("")
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const info = await dispatch(addVacation(vacation))
        if (info === "OK") {
            setVacation({})
            setMessage("Vacation Added Successfully")
        } else {
            setMessage("Something Went Wrong, Press Add Again Please.")
        }
    }

    return <div>
        <form onSubmit={submitForm} className='position-absolute top-50 start-50 translate-middle'>
            <h3 className='text-center p-3'>Add A Vacation</h3>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={vacation.name && vacation.name} className="form-control" placeholder="Vacation name" name="name" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" placeholder="Describe that vacation" name="description" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="text" className="form-control" placeholder="Vacation price" name="price" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Picture</label>
                <input type="text" className="form-control" placeholder="Upload a picture" name="picture" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Vacation start date</label>
                <input type="date" className="form-control" name="startdate" onChange={handleChange} />
                <label>Vacation end date</label>
                <input type="date" className="form-control" name="enddate" onChange={handleChange} />
            </div>
            <div className='d-grid col-6 mx-auto m-3'>
                <button type="submit" className="btn btn-dark">Add</button>
            </div>
            <div>
                <p>{message && message}</p>
            </div>
        </form>
    </div>;
}

export default AddVacation;
