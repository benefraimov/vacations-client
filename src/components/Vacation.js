import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Vacation({ vacationObject, callbackFollow }) {
    const navigate = useNavigate()
    const [userFollow, setUserFollow] = useState()

    const userRedux = useSelector(({ userReducer }) => userReducer)
    const followersNumber = vacationObject.followers.length

    useEffect(() => {
        setUserFollow(vacationObject.followers.find(follower => follower.user === userRedux.userInfo._id))
    }, [vacationObject])

    const handleFollow = async () => {
        try {
            if (userFollow) {
                const user = { _id: userRedux.userInfo._id }
                const { data: resp } = await axios.put(`/api/vacations/unfollow/${vacationObject._id}`, user)
                callbackFollow("unfollow")
            } else {
                const user = { _id: userRedux.userInfo._id }
                const { data: resp } = await axios.put(`/api/vacations/explore/${vacationObject._id}`, user)
                callbackFollow("follow")
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    const handleEdit = () => {
        navigate(`/admin/editvacation/${vacationObject._id}`)
    }

    const handleDelete = async () => {
        await axios.delete(`/api/vacations/${vacationObject._id}`)
        callbackFollow("follow")
    }

    return <Card className='my-3 p-3 rounded' style={{ maxWidth: "270px", width: "270px", maxHeight: "550px", height: "550px" }}>

        {
            userRedux.userInfo.isAdmin
                ?
                <div>
                    <FontAwesomeIcon
                        className="mb-2 fs-3 float-start edit-hover"
                        style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                        onClick={handleEdit}
                        icon={faEdit}
                    />
                    <FontAwesomeIcon
                        className="mb-2 fs-3 float-end delete-hover"
                        onClick={handleDelete}
                        icon={faTrashAlt}
                    />
                </div>
                :
                <FontAwesomeIcon
                    className={`ms-auto mb-2 fs-3 follow-hover ${userFollow ? 'text-warning' : 'text-dark'}`}
                    onClick={handleFollow}
                    icon={faFacebook}
                />
        }


        <Card.Img
            style={{ height: "152px", width: "230px", maxHeight: "152px", maxWidth: "230px" }}
            src={vacationObject.picture}
            variant='top' />

        <Card.Body>
            <Card.Title as='div' className='text-center fs-4'><strong>{vacationObject.name}</strong></Card.Title>

            <Card.Text as='p' className='text-start fs-6 overflow-auto' style={{ maxHeight: "55px", height: "55px" }}>
                {vacationObject.description}
            </Card.Text>

            <Card.Text as='div' className='text-start fs-6'>
                Dates : <br />
                From {" "}{vacationObject.startdate.slice(0, 10)}<br />
                to {" "}{vacationObject.enddate.slice(0, 10)}
            </Card.Text><br />

            <Card.Text as='div' className='text-center fs-6'>
                Followers : {followersNumber}
            </Card.Text><br />


            <Card.Text as='h3' className='text-center fs-6'><span className='fw-light text-capitalize '>Price: </span> ${vacationObject.price}</Card.Text>
        </Card.Body>
    </Card >
}

export default Vacation;
