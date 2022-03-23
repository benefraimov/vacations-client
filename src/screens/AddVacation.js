import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVacation } from '../redux/actions';
import { useNavigate } from 'react-router-dom'

function AddVacation({ socket }) {
    const navigate = useNavigate()
    const [vacation, setVacation] = useState({ name: "", description: "", price: "", picture: "", startdate: "", enddate: "" })
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const userRedux = useSelector(({ userReducer }) => userReducer)

    const [response, setResponse] = useState("")

    useEffect(() => {
        setMessage("")
        setVacation({ name: "", description: "", price: "", picture: "", startdate: "", enddate: "" })
        if (userRedux.userLogin && userRedux.userLogin === 'USER' || userRedux.userLogin === 'ADMIN') {
        } else {
            navigate('/sign-in')
        }
    }, [navigate, userRedux])

    const handleChange = (e) => {
        const { name, value } = e.target
        setVacation({ ...vacation, [name]: value })
        setMessage("")
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const info = await dispatch(addVacation(vacation))
        if (info === "OK") {
            setVacation({ name: "", description: "", price: "", picture: "", startdate: "", enddate: "" })
            setMessage("Vacation Added Successfully")
            addVacationSocket()
            setTimeout(() => {
                navigate('/')
            }, 500)
        } else {
            setMessage("Something Went Wrong, Press Add Again Please.")
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('picture', file)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/uploads', formData, config)
            setVacation({ ...vacation, picture: data })
        } catch (error) {
            console.log(error)
        }
    }

    const addVacationSocket = () => {
        socket.emit('newVacation', "newVacationAdded")
    }

    return <div>
        <form onSubmit={submitForm} className='position-absolute top-50 start-50 translate-middle'>
            <h3 className='text-center p-1 mt-5 text-capitalize'>Add A Vacation</h3>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={vacation.name && vacation.name} className="form-control form-control-sm" placeholder="Vacation name" name="name" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control form-control-sm" placeholder="Describe that vacation" name="description" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="text" className="form-control form-control-sm" placeholder="Vacation price" name="price" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Picture</label>
                <input type="file" className="form-control form-control-sm" placeholder="Upload a picture" name="picture" onChange={uploadFileHandler} />
            </div>
            <div className="form-group">
                <label>Vacation start date</label>
                <input type="date" className="form-control form-control-sm" name="startdate" onChange={handleChange} />
                <label>Vacation end date</label>
                <input type="date" className="form-control form-control-sm" name="enddate" onChange={handleChange} />
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
