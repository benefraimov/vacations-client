import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

function AdminEditVacation({ socket }) {
    const params = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [vacation, setVacation] = useState({
        name: "",
        description: "",
        price: "",
        picture: "",
        startdate: "",
        enddate: ""
    })
    const userRedux = useSelector(({ userReducer }) => userReducer)

    useEffect(() => {
        if (userRedux.userLogin && !userRedux.userLogin === 'ADMIN') {
            navigate('/')
        }
    }, [navigate, userRedux])

    useEffect(() => {
        setMessage("")
        axios.get(`/api/vacations/${params.id}`).then(({ data }) => {
            setVacation(data)
        }).catch(err => console.log(err))
    }, [params])

    const handleChange = (e) => {
        const { name, value } = e.target
        setVacation({ ...vacation, [name]: value })
        setMessage("")
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const { data } = await axios.put(`/api/vacations/${params.id}`, vacation)
        console.log(data.status)
        if (data.status === 201) {
            editVacationSocket()
            navigate('/')
        } else {
            setMessage("Something went wrong, Try again please.")
        }
    }

    const editVacationSocket = () => {
        socket.emit('editVacation', "editVacation")
    }

    return (
        <form onSubmit={submitForm} className='position-absolute top-50 start-50 translate-middle'>
            <h3 className='text-center p-3 my-1'>Edit {vacation.name} Vacation</h3>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={vacation.name && vacation.name}
                    className="form-control"
                    placeholder="Vacation name"
                    name="name"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    value={vacation.description && vacation.description}
                    className="form-control"
                    placeholder="Describe that vacation"
                    name="description"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input
                    type="text"
                    value={vacation.price && vacation.price}
                    className="form-control"
                    placeholder="Vacation price"
                    name="price"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Picture</label>
                <input
                    type="text"
                    value={vacation.picture && vacation.picture}
                    className="form-control"
                    placeholder="Upload a picture"
                    name="picture"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Vacation start date</label>
                <input
                    type="date"
                    value={vacation.startdate && vacation.startdate.slice(0, 10)}
                    className="form-control"
                    name="startdate"
                    onChange={handleChange}
                />
                <label>Vacation end date</label>
                <input
                    type="date"
                    value={vacation.enddate && vacation.enddate.slice(0, 10)}
                    className="form-control"
                    name="enddate"
                    onChange={handleChange}
                />
            </div>
            <div className='d-grid col-6 mx-auto m-3'>
                <button
                    type="submit"
                    className="btn btn-dark"
                >Edit</button>
            </div>
            <div>
                <p>{message && message}</p>
            </div>
        </form>
    )
}

export default AdminEditVacation